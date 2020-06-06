import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, reaction } from "mobx";
import api from "../api/api";
import { toast } from "react-toastify";
import { setPostProps } from "../common/util/util";
import { IPost, IPostsForm } from "../models/post";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";
import { IReaction } from "../models/reaction";
import { ISearchablePostDto, ISearchPost } from "../models/Dto/searchPostDto";
import { history } from "../../index";
const orderBy = require("lodash.orderby");

const LIMIT = 5;

export default class PostStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.postsRegistry.clear();
        this.getPosts();
      }
    );
  }

  @observable postsRegistry = new Map();
  @observable loadingPosts = false;
  @observable reactionLoading = false;
  @observable reactionTarget = "";
  @observable postsBySearchTerm: ISearchPost[] | null = null;
  @observable searchablePosts: ISearchablePostDto[] | null = null;
  @observable detailedPost: IPost | null = null;
  @observable postsCount = 0;
  @observable page = 0;
  @observable predicate = new Map();
  @observable changingPage = false;
  @observable creatingPost = false;

  @action setChangingPage = (changingPage: boolean) => {
    this.changingPage = changingPage;
  };

  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
  };

  @computed get totalPages() {
    return Math.ceil(this.postsCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(LIMIT));
    params.append("offset", `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  @action getPosts = async () => {
    try {
      if (
        this.postsRegistry.size === 0 ||
        this.changingPage ||
        this.postsCount === 0
      ) {
        this.postsRegistry.clear();
        this.loadingPosts = true;
        const postsEnvelope = await api.Post.list(this.axiosParams);
        let { posts, postsCount } = postsEnvelope;
        runInAction(() => {
          posts.forEach((post: IPost) => {
            setPostProps(post, this.rootStore.userStore.anonymousUser!);
            this.postsRegistry.set(post.slug, post);
          });
          this.loadingPosts = false;
          this.postsCount = postsCount;
        });
      }
    } catch (error) {
      toast.error(error);
      runInAction(() => {
        this.loadingPosts = false;
      });
    }
  };

  @action getDetailedPost = async (slug: string) => {
    this.loadingPosts = true;
    try {
      const detailedPostFromMemory = this.postsRegistry.get(slug);
      if (detailedPostFromMemory) {
        this.detailedPost = detailedPostFromMemory;
      } else {
        const detailedPost = await api.Post.detail(slug);
        runInAction(() => {
          setPostProps(detailedPost, this.rootStore.userStore.anonymousUser!);
          this.detailedPost = detailedPost;
        });
      }

      runInAction(() => {
        this.loadingPosts = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingPosts = false;
      });
    }
  };

  @action setSearchablePosts = async () => {
    if (!this.searchablePosts) {
      let searchablePosts: ISearchablePostDto[] = await api.Post.searchableList();
      const orderedPosts = orderBy(searchablePosts, ["publishDate"], ["desc"]);

      runInAction(() => {
        this.searchablePosts = orderedPosts;
      });
    }
  };

  @action setPostsBySearchTerm = (searchTerm: string) => {
    let postsFiltered: ISearchPost[] = [];

    if (this.searchablePosts) {
      this.searchablePosts.forEach((post) => {
        //If the search terms includes either the post title or the category name
        if (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          const postMapped: ISearchPost = {
            slug: post.slug,
            title: post.title,
            description: post.description,
            image: post.image,
          };

          postsFiltered.push(postMapped);
        }
        this.postsBySearchTerm = postsFiltered;
      });
    }
  };

  @action reactToPost = async (postSlug: string, postId: string) => {
    this.reactionLoading = true;
    this.reactionTarget = postSlug;

    const userFP = this.rootStore.userStore.anonymousUser?.fingerprint!;
    const userId = this.rootStore.userStore.anonymousUser?.id;

    var reactionEnvelope: IReactionEnvelope = {
      postId: postId,
      authorFingerPrint: userFP,
    };

    try {
      const reaction = await api.Post.react(reactionEnvelope);

      runInAction(() => {
        //If posts is not in the registry, user haven't loaded the posts lists,
        //   so he is in the detailed page, he is reacting to the post that he has selected
        let post: IPost = this.postsRegistry.get(postSlug)
          ? this.postsRegistry.get(postSlug)
          : this.detailedPost!;

        let hasNotReactedBefore = true;

        post.reactions = post.reactions.filter((reaction: IReaction) => {
          //If user already reacted before, invert the reaction bool
          if (reaction.author.id === userId) {
            reaction.isPositive = !reaction.isPositive;
            hasNotReactedBefore = false;
          }
          return reaction;
        });

        //If user never liked this post, push him to the reaction array
        if (hasNotReactedBefore) {
          post.reactions.push(reaction);
        }

        post.hasLiked = reaction.isPositive;
        post.hasLiked
          ? post.positiveReactionsCount++
          : post.positiveReactionsCount--;

        this.postsRegistry.set(post.slug, post);
        this.reactionLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.reactionLoading = false;
      });
    }
  };

  @action createPost = async (post: IPostsForm) => {
    this.creatingPost = true;
    try {
      const imageUrl = await api.Admin.uploadPostImage(post.image as Blob);
      post.image = imageUrl;
      await api.Post.create(post);
      runInAction(() => {
        this.creatingPost = false;
      });
      history.push(`/post/${post.slug}`);
    } catch (error) {
      runInAction(() => {
        this.creatingPost = false;
      });
      console.log(error);
      throw error;
    }
  };

  @action editPost = async (post: IPostsForm, postId: string) => {
    try {
      const imageUrl = await api.Admin.uploadPostImage(post.image as Blob);
      post.image = imageUrl;
      await api.Post.edit(post, postId);
      runInAction(() => {
        this.postsRegistry.clear();
      })
      history.push(`/post/${post.slug}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  @computed get orderPosts(): IPost[] {
    const posts = Array.from(this.postsRegistry.values());

    if (this.predicate.get("filter") === "popular") {
      //Order by positive reactions and then by publish date
      return orderBy(
        posts,
        [
          function (post: IPost) {
            return post.reactions.filter((x) => x.isPositive);
          },
          "publishDate",
        ],
        ["desc", "desc"]
      );
    } else {
      return orderBy(posts, ["publishDate"], ["desc"]);
    }
  }
}

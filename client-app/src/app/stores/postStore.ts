import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import api from "../api/api";
import { toast } from "react-toastify";
import { setPostProps } from "../common/util/util";
import { IPost } from "../models/post";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";
import { IReaction } from "../models/reaction";
import { ISearchablePostDto, ISearchPost } from "../models/Dto/searchPostDto";
var orderBy = require('lodash.orderby');

export default class PostStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable postsRegistry = new Map();
  @observable loadingPosts = false;
  @observable reactionLoading = false;
  @observable reactionTarget = "";
  @observable postsBySearchTerm: ISearchPost[] | null = null;
  @observable searchablePosts: ISearchablePostDto[] | null = null;
  @observable detailedPost: IPost | null = null;

  @action getPosts = async () => {
    try {
      if (this.postsRegistry.size === 0) {
        this.loadingPosts = true;
        let posts = await api.Post.list();
        runInAction(() => {
          posts.forEach((post) => {
            setPostProps(post, this.rootStore.userStore.anonymousUser!);
            this.postsRegistry.set(post.slug, post);
            this.loadingPosts = false;
          });
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

  @computed get postsByDate(): IPost[] {
    const posts = Array.from(this.postsRegistry.values());
    return orderBy(posts, ["publishDate"], ["desc"]); 
  }
}

import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import api from "../api/api";
import { toast } from "react-toastify";
import { setPostProps } from "../common/util/util";
import { IPost } from "../models/post";
import { IReactionEnvelope } from "../models/Requests/reactionEnvelope";
import { IReaction } from "../models/reaction";
import { ISearchPostDto } from "../models/Dto/searchPostDto";

export default class PostStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable postsRegistry = new Map();
  @observable loadingPosts = false;
  @observable reactionLoading = false;
  @observable reactionTarget = "";
  @observable postsBySearchTerm: ISearchPostDto[] | null = null;
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

  @action setPostsBySearchTerm = (searchTerm: string) => {
    let postsFiltered: ISearchPostDto[] = [];
    this.postsByDate.forEach((post) => {
      //If the search terms includes either the post title or the category name
      if (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        let searchPost: ISearchPostDto = {
          slug: post.slug,
          title: post.title,
          image: post.image,
          description: post.category.name,
        };
        postsFiltered.push(searchPost);
      }
    });

    this.postsBySearchTerm = postsFiltered;
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
        const post: IPost = this.postsRegistry.get(postSlug);
        let hasNotReactedBefore = true;

        console.log(post);
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
    return posts.sort(
      (a, b) => a.publishDate.getTime() - b.publishDate.getTime()
    );
  }
}

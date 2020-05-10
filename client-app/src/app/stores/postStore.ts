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

  @action getPosts = async () => {
    this.loadingPosts = true;

    try {
      let posts = await api.Post.list();
      runInAction(() => {
        console.log(posts);
        posts.forEach((post) => {
          setPostProps(post, this.rootStore.userStore.anonymousUser!);
          this.postsRegistry.set(post.id, post);
        });
        this.loadingPosts = false;
      });
    } catch (error) {
      toast.error(error);
      this.loadingPosts = false;
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

  @action reactToPost = async (postId: string) => {
    this.reactionLoading = true;
    this.reactionTarget = postId;

    const userFP = this.rootStore.userStore.anonymousUser?.fingerPrint!;
    const userId = this.rootStore.userStore.anonymousUser?.id;

    var reactionEnvelope: IReactionEnvelope = {
      postId: postId,
      authorFingerPrint: userFP,
    };

    try {
      const reaction = await api.Post.react(reactionEnvelope);

      runInAction(() => {
        const post: IPost = this.postsRegistry.get(postId);
        let hasNotReactedBefore = true;

        post.reactions = post.reactions.filter((reaction: IReaction) => {
          //If user already reacted before, invert the reaction bool
          if (reaction.author.id === userId) {
            reaction.isPositive = !reaction.isPositive;
            hasNotReactedBefore = false;
          }
          return reaction;
        });

        //If user never like this post, push him to the reaction array
        if (hasNotReactedBefore) {
          post.reactions.push(reaction);
        }

        post.hasLiked = reaction.isPositive;
        post.hasLiked
          ? post.positiveReactionsCount++
          : post.positiveReactionsCount--;

        this.postsRegistry.set(postId, post);
        this.reactionLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.reactionLoading = false;
    }
  };

  @computed get postsByDate(): IPost[] {
    const posts = Array.from(this.postsRegistry.values());
    return posts.sort(
      (a, b) => a.publishDate.getTime() - b.publishDate.getTime()
    );
  }
}

import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import api from "../api/api";
import { toast } from "react-toastify";
import { setPostProps } from "../common/util/util";
import { IPost } from "../models/post";

export default class PostStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable postsRegistry = new Map();
  @observable loadingPosts = false;

  @action getPosts = async () => {
    this.loadingPosts = true;

    try {
      let posts = await api.Post.list();
      runInAction(() => {
        console.log(posts);
        posts.forEach((post) => {
          setPostProps(post);
          this.postsRegistry.set(post.id, post);
        });
        this.loadingPosts = false;
      });
    } catch (error) {
      toast.error(error);
      this.loadingPosts = false;
    }
  };

  @computed get postsByDate(): IPost[] {
    const posts = Array.from(this.postsRegistry.values());
    return posts.sort(
      (a, b) => a.publishDate.getTime() - b.publishDate.getTime()
    );
  }
}

import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { toast } from "react-toastify";
import api from "../api/api";

export default class AdminStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable uploadingImage = false;
  @observable newPostImageUrl = "";

  @action uploadImage = async (file: Blob) => {
    this.uploadingImage = true;
    try {
      const imageUrl = await api.Admin.uploadImage(file);
      runInAction(() => {
        this.newPostImageUrl = imageUrl;
        this.uploadingImage = false;
      });
      toast.success("Image sucessfully uploaded to cloudinary.");
    } catch (error) {
      console.log(error);
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.uploadingImage = false;
      });
    }
  };

  @action setNewPostImageUrl = (newUrl: string) => {
    this.newPostImageUrl = newUrl;
  }
}

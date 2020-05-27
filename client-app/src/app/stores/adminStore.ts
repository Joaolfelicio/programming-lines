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

  uploadImage = async (file: Blob): Promise<string> => {
    let url = "";
    this.setUploadingImage(true);
    try {
      const imageUrl = await api.Admin.uploadImage(file);
      runInAction(() => {
        url = imageUrl;
        this.setUploadingImage(false);
      });
      toast.success("Image sucessfully uploaded to cloudinary.");
    } catch (error) {
      toast.error("Problem uploading photo");
      runInAction(() => {
        this.setUploadingImage(false);
      });
    } finally {
      return url;
    }
  };

  @action setUploadingImage = (uploading: boolean) => {
    this.uploadingImage = uploading;
  }
}

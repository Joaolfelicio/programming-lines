import { RootStore } from "./rootStore";
import { configure, observable, action, runInAction } from "mobx";
import api from "../api/api";

configure({ enforceActions: "always" });

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable isDeletionModalOpen = false;
  @observable deletionHeaderMessage = "";
  @observable deletionContentMessage = "";
  @observable deletionId = "";
  @observable deletionType = "";
  @observable deletionLoading = false;

  @action setIsDeletionModalOpen = (isOpen: boolean) => {
    this.isDeletionModalOpen = isOpen;
  };

  @action formatDeletionModal = (
    headerMessage: string,
    contentMessage: string,
    deletionId: string,
    deletionType: string
  ) => {
    this.deletionHeaderMessage = headerMessage;
    this.deletionContentMessage = contentMessage;
    this.deletionId = deletionId;
    this.deletionType = deletionType;
  };

  @action deleteObject = async () => {
    this.deletionLoading = true;
    try {
      if (this.deletionType === "post") {
        await api.Post.delete(this.deletionId);
        window.location.reload();
      } else if (this.deletionType === "category") {
        await api.Category.delete(this.deletionId);
        window.location.reload();
      } else if (this.deletionType === "newsletter") {
        await api.Newsletter.delete(this.deletionId);
        runInAction(() => {
          this.rootStore.newsletterStore.newsletterRegistry.delete(
            this.deletionId
          );
        });
      }
      runInAction(() => {
        this.isDeletionModalOpen = false;
        this.deletionLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.deletionLoading = false;
      });
    }
  };
}

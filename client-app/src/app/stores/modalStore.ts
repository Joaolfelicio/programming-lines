import { RootStore } from "./rootStore";
import { configure, observable, action } from "mobx";

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

  @action deleteObject = () => {
      this.deletionLoading = true;
    if (this.deletionType === "post") {
    } else if (this.deletionType === "category") {
    }
    this.deletionLoading = false;
    this.isDeletionModalOpen = false;
  };
}

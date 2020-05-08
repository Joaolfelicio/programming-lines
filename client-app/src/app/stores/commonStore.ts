import { RootStore } from "./rootStore";
import { observable, action, configure } from "mobx";

configure({ enforceActions: "always" });

export default class CommonStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable appLoading = true;
  @observable isDarkMode = true;
  @observable activeNavItem = "posts";

  @action setAppLoading = () => {
    this.appLoading = false;
  };

  @action setIsDarkMode = () => {
    this.isDarkMode = !this.isDarkMode;
  };

  @action setActiveNavItem = (active: string) => {
      this.activeNavItem = active;
  };
}

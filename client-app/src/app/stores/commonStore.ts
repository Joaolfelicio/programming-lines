import { RootStore } from "./rootStore";
import { observable, action, configure, reaction } from "mobx";
import api from "../api/api";
import { INewsletterEnvelope } from "../models/Requests/newsletterEnvelope";
import { toast } from "react-toastify";

configure({ enforceActions: "always" });

export default class CommonStore {
  rootStore: RootStore;



  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.isDarkMode,
      (isDarkMode) => {
        localStorage.setItem("DarkMode", isDarkMode.toString());
      }
    )

    //If the user deselects any filter
    reaction(
      () => this.activeFilter,
      (activeFilter) => {
        if(activeFilter == "Recent") {
          this.rootStore.postStore.setPredicate("all", "recent");
        }
      }
    )
  }

  @observable appLoading = true;
  @observable isDarkMode = localStorage.getItem("DarkMode") ? (localStorage.getItem("DarkMode") === "true" ) : true;
  @observable activeNavItem = "posts";
  @observable activeFilter = "Recent";

  @action setActiveFilter = (filter: string) => {
    this.activeFilter = filter;
  }

  @action setAppLoading = () => {
    this.appLoading = false;
  };

  @action setIsDarkMode = () => {
    this.isDarkMode = !this.isDarkMode;
  };

  @action setActiveNavItem = (active: string) => {
    this.activeNavItem = active;
  };

  @action subscribeNewsletter = async (displayName: string, email: string) => {
    const newsletter: INewsletterEnvelope = {
      displayName: displayName,
      email: email,
    };
    try {
      await api.Newsletter.subscribe(newsletter);
      toast.success("Sucessfully subscribed to the newsletter.");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

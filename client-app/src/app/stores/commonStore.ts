import { RootStore } from "./rootStore";
import { observable, action, configure } from "mobx";
import api from "../api/api";
import { INewsletterEnvelope } from "../models/Requests/newsletterEnvelope";
import { toast } from "react-toastify";

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
    console.log(this.isDarkMode)
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

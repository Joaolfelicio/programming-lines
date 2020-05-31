import { RootStore } from "./rootStore";
import { configure, action, observable, runInAction, computed } from "mobx";
import { INewsletterEnvelope } from "../models/Requests/newsletterEnvelope";
import { INewsletter } from "../models/newsletter";
import api from "../api/api";
import { toast } from "react-toastify";
const orderBy = require("lodash.orderby");

configure({ enforceActions: "always" });

export default class NewsletterStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable newsletterRegistry = new Map();
  @observable loadingNewsletter = false;

  @action getNewsletters = async () => {
    this.loadingNewsletter = true;
    try {
      if (this.newsletterRegistry.size === 0) {
        let newsletters = await api.Newsletter.list();
        runInAction(() => {
          newsletters.forEach((newsletter: INewsletter) => {
            this.newsletterRegistry.set(newsletter.id, newsletter);
          });
        });
      }
      runInAction(() => {
        this.loadingNewsletter = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingNewsletter = false;
      });
    }
  };

  @computed get newslettersByOrder(): INewsletter[] {
    const newsletters = Array.from(this.newsletterRegistry.values());
    return orderBy(newsletters, ["subscriptionDate"], ["desc"]);
  }

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

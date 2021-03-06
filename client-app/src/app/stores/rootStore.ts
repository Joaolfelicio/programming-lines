import PostStore from "./postStore";
import { createContext } from "react";
import CommonStore from "./commonStore";
import { configure } from "mobx";
import { UserStore } from "./userStore";
import CategoryStore from "./categoryStore";
import AdminStore from "./adminStore";
import ModalStore from "./modalStore";
import NewsletterStore from "./newsletterStore";

configure({ enforceActions: "always" });

export class RootStore {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
    categoryStore: CategoryStore;
    adminStore: AdminStore;
    modalStore: ModalStore;
    newsletterStore: NewsletterStore;

    constructor() {
        this.postStore = new PostStore(this);
        this.commonStore = new CommonStore(this);
        this.userStore = new UserStore(this);
        this.categoryStore = new CategoryStore(this);
        this.adminStore = new AdminStore(this);
        this.modalStore = new ModalStore(this);
        this.newsletterStore = new NewsletterStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
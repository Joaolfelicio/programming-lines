import PostStore from "./postStore";
import { createContext } from "react";
import CommonStore from "./commonStore";
import { configure } from "mobx";
import { UserStore } from "./userStore";
import CategoryStore from "./categoryStore";

configure({ enforceActions: "always" });

export class RootStore {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
    categoryStore: CategoryStore;

    constructor() {
        this.postStore = new PostStore(this);
        this.commonStore = new CommonStore(this);
        this.userStore = new UserStore(this);
        this.categoryStore = new CategoryStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
import PostStore from "./postStore";
import { createContext } from "react";
import CommonStore from "./commonStore";
import { configure } from "mobx";
import { UserStore } from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;

    constructor() {
        this.postStore = new PostStore(this);
        this.commonStore = new CommonStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
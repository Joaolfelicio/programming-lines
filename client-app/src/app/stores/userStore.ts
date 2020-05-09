import { RootStore } from "./rootStore";
import { action, observable } from "mobx";
import { IAnonymousUser } from "../models/anonymousUser";

export class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

    @observable anonymousUser: IAnonymousUser | null = null;

    @action setAnonymousUser = () => {
        
    }
}
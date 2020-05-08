import { RootStore } from "./rootStore";


export default class PostStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
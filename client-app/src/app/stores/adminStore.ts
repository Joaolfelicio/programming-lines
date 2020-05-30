import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { toast } from "react-toastify";
import api from "../api/api";

export default class AdminStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }


}

/* eslint-disable */
import { RootStore } from "./rootStore";
import { action, observable, runInAction } from "mobx";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import api from "../api/api";
import Fingerprint2 from "fingerprintjs2";

export class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable anonymousUser: IAnonymousUser | null = null;

  @action setAnonymousUser = () => {
    var info: IFingeprintEnvelope = {
      fingerprint: "",
    };

    setTimeout(() => {
      Fingerprint2.get(async (components) => {
        var values = components.map((component) => {
          return component.value;
        });
        info.fingerprint! = Fingerprint2.x64hash128(values.join(""), 31);

        var anonUser = await api.AnonUser.get(info);
        console.log(anonUser);
        runInAction(() => {
          this.rootStore.commonStore.appLoading = false;
          this.anonymousUser = anonUser;
        });
      }),
        250;
    });
  };
}

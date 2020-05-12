/* eslint-disable */
import { RootStore } from "./rootStore";
import { action, observable, runInAction } from "mobx";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import api from "../api/api";
import Fingerprint2 from "fingerprintjs2";
import { IAnonUserIdEnvelope } from "../models/Requests/anonUserIdEnvelope";

export class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable anonymousUser: IAnonymousUser | null = null;

  @action loginAnonymousUser = async () => {
    let storageAnonUserId = window.localStorage.getItem("AnonUserId");

    try {
      //If user already has a id stored in the local storage, check for null and undefined as string
      if (
        storageAnonUserId &&
        storageAnonUserId !== "undefined" &&
        storageAnonUserId !== "null"
      ) {
        let anonUserIdEnvelope: IAnonUserIdEnvelope = {
          anonUserId: storageAnonUserId,
        };

        //If user has a valid fingerprint, it will return the anonUser
        //If user has a invalid fingerprint, it will create and return a new anonUser
        let anonymousUser = await api.AnonUser.get(anonUserIdEnvelope);

        console.log("AnonUser.get(anonUserIdEnvelope)", anonymousUser);

        if (anonymousUser) {
          runInAction(() => {
            this.anonymousUser = anonymousUser;
            this.rootStore.commonStore.appLoading = false;
          });
        } else {
          this.createAnonymousUser();
        }

        // The anon user id in the local storage is invalid and there isn't any user with that id,
        //   Then, create a user
      } else {
        this.createAnonymousUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Generate the fingerprint and creates the user
  createAnonymousUser = () => {
    var info: IFingeprintEnvelope = {
      fingerprint: "",
    };

    setTimeout(() => {
      Fingerprint2.get(async (components) => {
        var values = components.map((component) => {
          return component.value;
        });
        info.fingerprint! = Fingerprint2.x64hash128(values.join(""), 31);
        var anonUser = await api.AnonUser.create(info);
        runInAction(() => {
          this.rootStore.commonStore.appLoading = false;
          this.anonymousUser = anonUser;
          console.log("Created", this.anonymousUser);
        });
        window.localStorage.setItem("AnonUserId", anonUser.id);
      }),
        250;
    });
  };
}

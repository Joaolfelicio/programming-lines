/* eslint-disable */
import { RootStore } from "./rootStore";
import { action, observable, runInAction, computed } from "mobx";
import { IAnonymousUser } from "../models/anonymousUser";
import { IFingeprintEnvelope } from "../models/Requests/fingerprintEnvelope";
import api from "../api/api";
import Fingerprint2 from "fingerprintjs2";
import { IAnonUserIdEnvelope } from "../models/Requests/anonUserIdEnvelope";
import { IAdminUser, IUserFormValues } from "../models/adminUser";
import { history } from "../..";

export class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable anonymousUser: IAnonymousUser | null = null;
  @observable adminUser: IAdminUser | null = null;

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
        });
        window.localStorage.setItem("AnonUserId", anonUser.id);
      }),
        250;
    });
  };

  @action loginAdminUser = async (adminUser: IUserFormValues) => {
    try {
      const user = await api.AdminUser.login(adminUser);
      runInAction(() => {
        this.adminUser = user;
        this.rootStore.commonStore.setToken(user.token);
      });
      history.push("/admin/dashboard");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await api.AdminUser.current();
      runInAction(() => {
        this.adminUser = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @computed get isAdminLoggedIn() {
    return !!this.adminUser;
  }
}

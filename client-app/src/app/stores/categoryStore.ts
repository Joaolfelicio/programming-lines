import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import api from "../api/api";
import { ICategory } from "../models/category";
const orderBy = require("lodash.orderby");

export default class CategoryStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable categoriesRegistry = new Map();
  @observable loadingCategories = true;

  @action getCategories = async () => {
    try {
      console.log(this.categoriesRegistry.size)
      if (this.categoriesRegistry.size === 0) {
        const categories = await api.Category.list();
        runInAction(() => {
          categories.forEach((category) => {
            this.categoriesRegistry.set(category.code, category);
          });
          this.loadingCategories = false;
        });
      }
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.loadingCategories = false;
      });
    }
  };

  @computed get categoryByOrder(): ICategory[] {
    const categories = Array.from(this.categoriesRegistry.values());
    return orderBy(categories, ["name"], ["asc"]);
  }
}

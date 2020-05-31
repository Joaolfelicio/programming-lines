import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import api from "../api/api";
import { ICategory, ICategoryForm } from "../models/category";
const orderBy = require("lodash.orderby");

export default class CategoryStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable categoriesRegistry = new Map();
  @observable loadingCategories = true;
  @observable creatingCategory = false;

  @action setCreatingCategory = (isCreating: boolean) => {
    this.creatingCategory = isCreating;
  }

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

  @action createCategory = async (category: ICategoryForm) => {
    this.creatingCategory = true;
    try {
      const imageUrl = await api.Admin.uploadCategoryImage(category.image as Blob);
      category.image = imageUrl;
      await api.Category.create(category);
      runInAction(() => {
        this.creatingCategory = false;
      });
      window.location.reload();

    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.creatingCategory = false;
      })
      throw error;
    }
  }

  @computed get categoryByOrder(): ICategory[] {
    const categories = Array.from(this.categoriesRegistry.values());
    return orderBy(categories, ["name"], ["asc"]);
  }
}

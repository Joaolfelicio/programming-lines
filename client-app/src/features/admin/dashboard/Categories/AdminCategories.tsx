import React, { Fragment, useContext, useEffect } from "react";
import CategoriesList from "./CategoriesList";
import CategoryForm from "./CategoryForm";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const AdminCategories = () => {
  const rootStore = useContext(RootStoreContext);
  const { getCategories } = rootStore.categoryStore;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Fragment>
      <CategoriesList />
      <CategoryForm />
    </Fragment>
  );
};

export default observer(AdminCategories);

import React, { useContext } from "react";
import { Segment, List, Header } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import CategoriesListItem from "./CategoriesListItem";
import { observer } from "mobx-react-lite";

const CategoriesList = () => {
  const rootStore = useContext(RootStoreContext);
  const { categoryByOrder } = rootStore.categoryStore;

  return (
    <Segment raised>
      <Header
        content="Categories List"
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <List divided verticalAlign="middle">
        {categoryByOrder.map((category) => (
          <CategoriesListItem category={category} key={category.code} />
        ))}
      </List>
    </Segment>
  );
};

export default observer(CategoriesList);

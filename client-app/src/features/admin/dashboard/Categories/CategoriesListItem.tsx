import React, { useContext } from "react";
import { ICategory } from "../../../../app/models/category";
import { List, Button, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  category: ICategory;
}

const CategoriesListItem: React.FC<IProps> = ({ category }) => {
  const rootStore = useContext(RootStoreContext);
  const { setIsDeletionModalOpen, formatDeletionModal } = rootStore.modalStore;
  const { getCategoryToEdit } = rootStore.categoryStore;

  return (
    <div
      style={{
        marginTop: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "20%" }}>
        <Image src={category.image} style={{ width: 21, height: 20 }} />
        <List.Content style={{ marginLeft: 5 }}>{category.name}</List.Content>
      </div>
      <List.Content
        style={{ display: "flex", alignItems: "center", fontStyle: "italic" }}
      >
        {category.code}
      </List.Content>
      <div>
        <Button
          negative
          size="small"
          onClick={() => {
            formatDeletionModal(
              "Delete Category?",
              `All the posts in this category will be deleted. Are you sure that you want to delete ${category.name}?`,
              category.id,
              "category"
            );
            setIsDeletionModalOpen(true);
          }}
        >
          Delete
        </Button>
        <Button
          primary
          size="small"
          onClick={() => getCategoryToEdit(category.code)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default observer(CategoriesListItem);

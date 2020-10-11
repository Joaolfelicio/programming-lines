import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import "./style/AdminDashboardCategoriesStyle.css";

interface IProps {
  setSelectedCategory: (categoryCode: string) => void;
  selectedCategory: string;
}

const DropdownCategories: React.FC<IProps> = ({
  setSelectedCategory,
  selectedCategory,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { categoryByOrder, loadingCategories } = rootStore.categoryStore;
  const { isDarkMode } = rootStore.commonStore;

  const formatCategories = () => {
    const categories: any = [];

    categoryByOrder.forEach((category) => {
      categories.push({
        key: category.code,
        text: category.name,
        value: category.code,
        image: { avatar: true, src: category.image },
      });
    });
    setFormatedCategories(categories);
  };

  useEffect(() => {
    formatCategories();
  }, []);

  const [formatedCategories, setFormatedCategories] = useState([]);

  return (
    <Dropdown
      placeholder="Select the category"
      fluid
      className={isDarkMode ? "category-dropdown" : ""}
      search
      selection
      selectOnBlur={false}
      options={formatedCategories}
      onChange={(e, { value }) => setSelectedCategory(value as string)}
      value={selectedCategory}
      loading={loadingCategories}
      id={isDarkMode ? "category-dropdown-darkMode" : ""
      }
    />
  );
};

export default observer(DropdownCategories);

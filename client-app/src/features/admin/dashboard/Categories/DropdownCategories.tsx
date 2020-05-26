import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";

interface IProps {
  setSelectedCategory: (categoryCode: string) => void;
}

const DropdownCategories: React.FC<IProps> = ({ setSelectedCategory }) => {
  const rootStore = useContext(RootStoreContext);
  const { categoryByOrder, getCategories } = rootStore.categoryStore;

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
    getCategories();
    formatCategories();
  }, [getCategories]);

  const [formatedCategories, setFormatedCategories] = useState([]);

  return (
    <Dropdown
      placeholder="Select the category"
      fluid
      className="category-dropdown"
      search
      selection
      options={formatedCategories}
      onChange={(e, {value}) => setSelectedCategory(value as string)}
    />
  );
};

export default DropdownCategories;

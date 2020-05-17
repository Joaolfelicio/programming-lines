import React, { useContext, useEffect } from "react";
import { Menu, Loader, Placeholder } from "semantic-ui-react";
import PostFiltersCategory from "./PostFiltersCategory";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostFiltersCategoryPlaceholder from "./PostFiltersCategoryPlaceholder";

const PostFilters = () => {
  const rootContext = useContext(RootStoreContext);
  const { isDarkMode, activeFilter, setActiveFilter } = rootContext.commonStore;
  const { loadingCategories, getCategories } = rootContext.categoryStore;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Menu
      inverted={isDarkMode}
      secondary
      vertical
      style={{ width: 160, position: "fixed" }}
    >
      <Menu.Item
        name="Recent"
        active={activeFilter === "Recent"}
        onClick={() => setActiveFilter("Recent")}
        style={{ padding: "11px 13px" }}
      />
      <Menu.Item
        name="Popular"
        active={activeFilter === "Popular"}
        onClick={() => setActiveFilter("Popular")}
        style={{ padding: "11px 13px" }}
      />
      <Menu.Header
        content="CATEGORIES"
        style={{
          padding: "11px 13px",
          fontWeight: "bold",
          marginTop: 30,
          color: isDarkMode ? "white" : "rgb(29, 40, 51)",
        }}
      />

      {loadingCategories ? (
        <PostFiltersCategoryPlaceholder />
      ) : (
        <PostFiltersCategory />
      )}
    </Menu>
  );
};

export default observer(PostFilters);

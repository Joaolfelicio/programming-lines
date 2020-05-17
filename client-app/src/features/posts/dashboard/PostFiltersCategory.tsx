import React, { useEffect, useContext, Fragment } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Menu, Image } from "semantic-ui-react";

const PostFiltersCategory = () => {
  const rootContext = useContext(RootStoreContext);
  const { categoryByOrder } = rootContext.categoryStore;
  const { activeFilter, setActiveFilter } = rootContext.commonStore;

  return (
    <Fragment>
      {categoryByOrder.map((category) => (
        <Menu.Item
          key={category.code}
          active={activeFilter === category.code}
          onClick={() => setActiveFilter(category.code)}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Image src={category.image} style={{ width: 21, height: 20 }} />
          <p style={{ marginLeft: 10 }}>{category.name}</p>
        </Menu.Item>
      ))}
    </Fragment>
  );
};

export default observer(PostFiltersCategory);

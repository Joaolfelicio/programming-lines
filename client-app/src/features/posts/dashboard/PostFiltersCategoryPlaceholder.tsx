import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Menu, Placeholder } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import "./style/PostDashboardStyle.css";

const PostFiltersCategoryPlaceholder = () => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;
  return (
    <Fragment>
      <Menu.Item>
        <Placeholder >
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
      <Menu.Item>
        <Placeholder className={isDarkMode ? "placeholder-darkMode" : ""}>
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
      <Menu.Item>
        <Placeholder className={isDarkMode ? "placeholder-darkMode" : ""}>
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
    </Fragment>
  );
};

export default observer(PostFiltersCategoryPlaceholder);

import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Menu, Placeholder } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PostFiltersCategoryPlaceholder = () => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;
  return (
    <Fragment>
      <Menu.Item>
        <Placeholder inverted={isDarkMode}>
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
      <Menu.Item>
        <Placeholder inverted={isDarkMode}>
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
      <Menu.Item>
        <Placeholder inverted={isDarkMode}>
          <Placeholder.Header>
            <Placeholder.Image style={{ width: 20, height: 20 }} />
          </Placeholder.Header>
        </Placeholder>
      </Menu.Item>
    </Fragment>
  );
};

export default observer(PostFiltersCategoryPlaceholder);

import React, { Fragment, useContext } from "react";
import { Placeholder, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PostListItemPlaceholder = () => {
  const rootContext = useContext(RootStoreContext);
  const { isDarkMode } = rootContext.commonStore;


  return (
    <Fragment>
      <Placeholder fluid >
        <Placeholder fluid >
          <Placeholder.Header image >
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      </Placeholder>
      <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
    </Fragment>
  );
};

export default PostListItemPlaceholder;

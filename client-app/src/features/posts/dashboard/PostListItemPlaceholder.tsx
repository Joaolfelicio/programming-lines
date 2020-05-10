import React, { Fragment } from "react";
import { Placeholder, Divider } from "semantic-ui-react";

const PostListItemPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid>
        <Placeholder fluid>
          <Placeholder.Header image>
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

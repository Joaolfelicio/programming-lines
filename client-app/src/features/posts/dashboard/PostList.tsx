import React, { Fragment } from "react";
import PostListItem from "./PostListItem";
import { ItemGroup } from "semantic-ui-react";

const PostList = () => {
  return (
    <Fragment>
      <ItemGroup>
        <PostListItem />
        <PostListItem />
      </ItemGroup>
    </Fragment>
  );
};

export default PostList;

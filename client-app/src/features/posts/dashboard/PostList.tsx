import React, { Fragment, useContext } from "react";
import PostListItem from "./PostListItem";
import { ItemGroup } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const PostList = () => {
  const rootStore = useContext(RootStoreContext);
  const { postsByDate } = rootStore.postStore;

  return (
    <Fragment>
      <ItemGroup>
        {postsByDate.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ItemGroup>
    </Fragment>
  );
};

export default observer(PostList);

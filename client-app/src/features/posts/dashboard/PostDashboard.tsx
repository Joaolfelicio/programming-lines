import React, { useContext, useEffect, Fragment } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import PostList from "./PostList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "./PostListItemPlaceholder";

const PostDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { getPosts, loadingPosts } = rootStore.postStore;
  const { setDisplayProgressBar } = rootStore.commonStore;

  useEffect(() => {
    setDisplayProgressBar(false);
    getPosts();
  }, [getPosts]);
  document.title = "Programming Lines";

  return (
    <Grid container>
      <GridColumn width={3}>Categories and stuff</GridColumn>
      <GridColumn width={13}>
        {loadingPosts ? (
          <Fragment>
            <PostListItemPlaceholder />
            <PostListItemPlaceholder />
            <PostListItemPlaceholder />
            <PostListItemPlaceholder />
          </Fragment>
        ) : (
          <PostList />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(PostDashboard);

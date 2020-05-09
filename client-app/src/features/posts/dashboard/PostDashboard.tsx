import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import PostList from "./PostList";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PostDashboard = () => {

  const rootStore = useContext(RootStoreContext);
  const { getPosts } = rootStore.postStore;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Grid style={{ marginTop: "20px" }} container>
      <GridColumn width={3}>Categories and stuff</GridColumn>
      <GridColumn width={13}>
        <PostList />
      </GridColumn>
    </Grid>
  );
};

export default PostDashboard;

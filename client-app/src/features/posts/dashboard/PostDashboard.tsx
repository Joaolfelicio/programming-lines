import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import PostList from "./PostList";

const PostDashboard = () => {
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

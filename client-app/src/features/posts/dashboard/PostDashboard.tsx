import React, { useContext, useEffect, Fragment } from "react";
import { Grid, GridColumn, Pagination } from "semantic-ui-react";
import PostList from "./PostList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "./PostListItemPlaceholder";
import PostFilters from "./PostFilters";

const PostDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getPosts,
    loadingPosts,
    totalPages,
    setPage,
    setChangingPage,
    page
  } = rootStore.postStore;

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  document.title = "Programming Lines";

  return (
    <Grid container>
      <GridColumn style={{ position: "relative" }} width={3}>
        <PostFilters />
      </GridColumn>
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
        <Pagination
          floated="right"
          ellipsisItem={undefined}
          pointing
          secondary
          activePage={page + 1}
          totalPages={totalPages}
          className="pagination"
          onPageChange={(e, { activePage }) => {
            setChangingPage(true);
            setPage((activePage! as number) - 1);
            getPosts();
            setChangingPage(false);
          }}
          style={{ marginTop: 35 }}
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(PostDashboard);

import React, { useContext, useEffect, Fragment } from "react";
import { Grid, GridColumn, Pagination } from "semantic-ui-react";
import PostList from "./PostList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "./PostListItemPlaceholder";
import PostFilters from "./PostFilters";
import { useMediaQuery } from "react-responsive";

const PostDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getPosts,
    loadingPosts,
    totalPages,
    setPage,
    setChangingPage,
    page,
  } = rootStore.postStore;

  const isSmallerPhone = useMediaQuery({ query: "(max-width: 646px)" });
  const isXsPhone = useMediaQuery({ query: "(max-width: 375px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 991px)" });

  const { isDarkMode } = rootStore.commonStore;

  useEffect(() => {
    getPosts();
  }, [getPosts]);
  document.title = "Programming Lines";

  return (
    <Grid
      container={isTablet}
      style={{
        marginLeft: isXsPhone ? "0.5em !important" : "",
        marginRight: isXsPhone ? "0.5em !important" : "",
      }}
    >
      <GridColumn
        style={{ position: "relative", display: isSmallerPhone ? "none" : "" }}
        width={3}
      >
        <PostFilters />
      </GridColumn>
      <GridColumn width={isSmallerPhone ? 16 : 13} >
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
          lastItem={totalPages >= 4 ? undefined : null}
          firstItem={totalPages >= 4 ? undefined : null}
          pointing
          secondary
          activePage={page + 1}
          totalPages={totalPages ? totalPages : 1}
          className={
            isDarkMode ? "pagination pagination-darkMode" : "pagination"
          }
          onPageChange={(e, { activePage }) => {
            setChangingPage(true);
            setPage((activePage! as number) - 1);
            getPosts();
            setChangingPage(false);
            window.scrollTo(0, 0);
          }}
          style={{ marginTop: 35, color: isDarkMode ? "#DFDFDF" : "#121212" }}
        />
      </GridColumn>
    </Grid>
  );
};

export default observer(PostDashboard);

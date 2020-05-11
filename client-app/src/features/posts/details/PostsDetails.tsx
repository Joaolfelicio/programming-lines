import React, { Fragment, useContext, useEffect } from "react";
import PostDetailedHeader from "./PostDetailedHeader";
import PostDetailedSidebar from "./PostDetailedSidebar";
import PostDetailedContent from "./PostDetailedContent";
import PostDetailedComments from "./PostDetailedComments";
import { Route, RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface DetailParams {
  slug: string;
}

const PostsDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {

    const rootStore = useContext(RootStoreContext);
    const {detailedPost, loadingPosts, getDetailedPost} = rootStore.postStore;

    useEffect(() => {
        getDetailedPost(match.params.slug);

    }, [getDetailedPost, match])

    if(!detailedPost) {
        return (<h1>Post not found</h1>)
    }

  return (
      
    <Grid>
      <Grid.Column width={3}>
        <PostDetailedSidebar />
      </Grid.Column>
      <Grid.Column width={13}>
        {detailedPost?.title}
        <PostDetailedHeader />
        <PostDetailedContent />
        <PostDetailedComments />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PostsDetails);

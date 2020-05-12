import React, { useContext, useEffect } from "react";
import PostDetailedSidebar from "./PostDetailedSidebar";
import PostDetailedContent from "./PostDetailedContent";
import PostDetailedComments from "./PostDetailedComments";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "../dashboard/PostListItemPlaceholder";
import PostDetailedHeader from "./PostDetailedHeader";

interface DetailParams {
  slug: string;
}

const PostsDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { detailedPost, loadingPosts, getDetailedPost } = rootStore.postStore;

  useEffect(() => {
    getDetailedPost(match.params.slug);
  }, [getDetailedPost, match]);

  if(loadingPosts) {
    return <PostListItemPlaceholder />
  }

  if (!detailedPost) {
    //TODO: Return to the 404 page
    return <h2>Activity Not Found</h2>;
  } 

  return (
    <Grid>
      <Grid.Column width={3}>
        <PostDetailedSidebar />
      </Grid.Column>
      <Grid.Column width={13}>
        <PostDetailedHeader post={detailedPost!} />
        <PostDetailedContent post={detailedPost!} />
        <PostDetailedComments />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PostsDetails);

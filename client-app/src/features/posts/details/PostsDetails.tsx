import React, { useContext, useEffect } from "react";
import PostDetailedContent from "./PostDetailedContent";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "../dashboard/PostListItemPlaceholder";
import PostDetailedHeader from "./PostDetailedHeader";
import PostDetailedFooter from "./PostDetailedFooter";


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
  }, [getDetailedPost, match.params.slug]);

  if (loadingPosts) {
    return <PostListItemPlaceholder />;
  }

  if (!detailedPost) {
    //TODO: Return to the 404 page
    return <h2>Activity Not Found</h2>;
  }

  document.title = `Programming Lines - ${detailedPost.title}`; 

  return (
    <Container text style={{ width: "80%", maxWidth: "680px" }}>
      <PostDetailedHeader post={detailedPost!} />
      <PostDetailedContent post={detailedPost!} />
      <PostDetailedFooter />
    </Container>
  );
};

export default observer(PostsDetails);

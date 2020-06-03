import React, { useContext, useEffect, Fragment } from "react";
import PostDetailedContent from "./PostDetailedContent";
import { RouteComponentProps } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostListItemPlaceholder from "../dashboard/PostListItemPlaceholder";
import PostDetailedHeader from "./PostDetailedHeader";
import PostDetailedFooter from "./PostDetailedFooter";
import PostDetailedInfo from "./PostDetailedInfo";
import ScrollTop from "react-scrolltop-button";

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
    document.title = `Programming Lines`;
    return <h2>Activity Not Found</h2>;
  } else {
    document.title = `${detailedPost.title} - Programming Lines`;
  }

  return (
    <Fragment>
      <Container text style={{ width: "80%", maxWidth: "680px" }}>
        <PostDetailedHeader post={detailedPost!} />
        <PostDetailedContent post={detailedPost!} />
        <PostDetailedInfo post={detailedPost!} />
        <PostDetailedFooter post={detailedPost!} />
        <ScrollTop
          text="Top"
          distance={500}
          className="back-top-button"
          breakpoint={9999}
          speed={500}
          icon={<Icon name="arrow up" />}
        />
      </Container>
    </Fragment>
  );
};

export default observer(PostsDetails);

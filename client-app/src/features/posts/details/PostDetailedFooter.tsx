import React, { Fragment } from "react";
import { IPost } from "../../../app/models/post";
import RecommendPostList from "./RecommendPostList";

interface IProps {
  post: IPost;
}

const PostDetailedFooter: React.FC<IProps> = ({ post }) => {
  return (
    <Fragment>
      {post.recommendedPosts && post.recommendedPosts.length > 0 && (
        <RecommendPostList recommendedPosts={post.recommendedPosts} />
      )}
    </Fragment>
  );
};

export default PostDetailedFooter;

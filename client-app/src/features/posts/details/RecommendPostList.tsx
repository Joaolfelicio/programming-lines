import React, { Fragment } from "react";
import { IPostRecommend } from "../../../app/models/post";
import RecommendPostCard from "./RecommendPostCard";
import { Header } from "semantic-ui-react";

interface IProps {
  recommendedPosts: IPostRecommend[];
}

const RecommendPostList: React.FC<IProps> = ({ recommendedPosts }) => {
  return (
    <Fragment>
      <Header
        style={{
          marginTop: 40,
          marginBottom: 20,
          fontSize: "1.8rem",
        }}
        className="markdown-body"
        as="h4"
        content="Recommended:"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        {recommendedPosts.map((post) => (
          <RecommendPostCard key={post.id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default RecommendPostList;

import React, { Fragment, useContext } from "react";
import { IPostRecommend } from "../../../app/models/post";
import RecommendPostCard from "./RecommendPostCard";
import { Header } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  recommendedPosts: IPostRecommend[];
}

const RecommendPostList: React.FC<IProps> = ({ recommendedPosts }) => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;

  return (
    <Fragment>
      <Header
        style={{
          marginTop: 40,
          marginBottom: 20,
          fontSize: "1.8rem",
          color: isDarkMode ? " rgba(255, 255, 255, 0.87)" : "#121212"
        }}
        className="markdown-body"
        as="h4"
        content="Recommended:"
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
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

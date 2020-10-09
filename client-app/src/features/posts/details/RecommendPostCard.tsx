import React, { useContext } from "react";
import { IPostRecommend } from "../../../app/models/post";
import { Card } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
const readingTime = require("reading-time");

interface IProps {
  post: IPostRecommend;
}

const RecommendPostCard: React.FC<IProps> = ({ post }) => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;

  return (
    <div style={{ width: "40%" }}>
      <Card
        as={Link}
        to={post.slug}
        style={{
          boxShadow: isDarkMode
            ? "none"
            : "0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5",
        }}
      >
        <img src={post.image} alt={post.title} style={{ height: 125 }} />
        <Card.Content
          style={{ backgroundColor: isDarkMode ? "rgb(100, 104, 109)" : "#fff" }}
        >
          <Card.Meta style={{ color: isDarkMode ? "#DFDFDF" : "#121212" }}>
            <time className="date">{moment().format("MMM Do YYYY")}</time>-
            <em style={{ marginLeft: 4.8 }}>
              {readingTime(post.content).text}
            </em>
          </Card.Meta>
          <Card.Description
            as="h4"
            style={{
              fontSize: "1.3rem",
              height: 70,
              color: isDarkMode ? "#DFDFDF" : "#121212",
            }}
          >
            {post.title}
          </Card.Description>
        </Card.Content>
        <Card.Content
          extra
          style={{
            display: "flex",
            alignItems: "center",
            color: isDarkMode ? "#DFDFDF" : "#121212",
            backgroundColor: isDarkMode ? "rgb(100, 104, 109)" : "#fff",
          }}
        >
          <img
            src={post.category.image}
            style={{ width: 27, height: 25 }}
            alt={post.category.image + "."}
          />
          <p style={{ marginLeft: 7 }}>{post.category.name}</p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default RecommendPostCard;

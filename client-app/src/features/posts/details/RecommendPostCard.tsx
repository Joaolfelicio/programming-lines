import React from "react";
import { IPostRecommend } from "../../../app/models/post";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
const readingTime = require("reading-time");

interface IProps {
  post: IPostRecommend;
}

const RecommendPostCard: React.FC<IProps> = ({ post }) => {
  return (
    <div style={{ width: "40%" }}>
      <Card as={Link} to={post.slug}>
        <Image src={post.image} alt={post.title} wrapped ui={false} />
        <Card.Content>
          <Card.Meta>
            <time className="date">{moment().format("MMM Do YYYY")}</time>-
            <em style={{ marginLeft: 4.8 }}>
              {readingTime(post.content).text}
            </em>
          </Card.Meta>
          <Card.Description as="h4" style={{ fontSize: "1.3rem", height: 65 }}>
            {post.title}
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{ display: "flex", alignItems: "center" }}>
          <img
            src={post.category.image}
            style={{ width: 40, padding: "3px 5px" }}
            alt={post.category.image}
          />
          <p style={{ marginLeft: 7 }}>{post.category.name}</p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default RecommendPostCard;

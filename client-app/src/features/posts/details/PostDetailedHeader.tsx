import React, { Fragment } from "react";
import { IPost } from "../../../app/models/post";
import { observer } from "mobx-react-lite";
import { Header, Image } from "semantic-ui-react";
import moment from "moment";

interface IProps {
  post: IPost;
}

const PostDetailedHeader: React.FC<IProps> = ({ post }) => {
  return (
    <Fragment>
      <Header as="h1" content={post.title} style={{ fontSize: "2.9rem" }} />
      <Header
        as="h2"
        style={{
          color: "rgb(100, 104, 109)",
          fontSize: "1.9rem"
        }}
        content={post.subTitle}
      />
      <p
        style={{
          color: "rgb(100, 104, 109)",
          fontSize: "1.15rem",
          marginBottom: "1.45rem",
        }}
      >
        <time>{moment(post.publishDate).format("MMM Do YYYY")}</time> -{" "}
        <em>{post.timeToRead}</em>
      </p>
      <Image
        fluid
        centered
        src={post.image}
        alt={post.title + "."}
        style={{ marginBottom: "40px", borderRadius: "3px" }}
      />
    </Fragment>
  );
};

export default observer(PostDetailedHeader);

import React, { Fragment } from "react";
import { IPost } from "../../../app/models/post";
import { observer } from "mobx-react-lite";
import { Header, Image } from "semantic-ui-react";

interface IProps {
  post: IPost;
}

const PostDetailedHeader: React.FC<IProps> = ({ post }) => {
  return (
    <Fragment>
      <Header as="h1" content={post.title} style={{ fontSize: "40px" }} />
      <Header
        as="h2"
        style={{
          color: "rgb(100, 104, 109)",
          fontSize: "28px",
        }}
        content={post.subTitle}
      />
      <Image
        fluid
        centered
        src={post.image}
        alt={post.title}
        style={{ margin: "40px 0px", borderRadius: "3px" }}
      />
    </Fragment>
  );
};

export default observer(PostDetailedHeader);

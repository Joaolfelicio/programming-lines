import React, { Fragment, useContext } from "react";
import { Divider, Label, Button, ButtonGroup } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IPost } from "../../../app/models/post";
import {
  twitterShareUrl,
  externalUrl,
  linkedInShareUrl,
  generateShareUrl,
  copyToClipboard,
} from "../../../app/common/util/util";
import { observer } from "mobx-react-lite";
import { history } from "../../../";

interface IProps {
  post: IPost;
}

const PostDetailedInfo: React.FC<IProps> = ({ post }) => {
  const rootStore = useContext(RootStoreContext);
  const { reactionLoading, reactToPost } = rootStore.postStore;
  const { setActiveFilter } = rootStore.commonStore;

  return (
    <Fragment>
      <Divider style={{ margin: "40px 0px" }} />
      <Label
        image
        size="big"
        onClick={() => {
          setActiveFilter(post.category.code);
          history.push("/");
        }}
        style={{
          marginBottom: 20,
          cursor: "pointer",
          padding: "20, 10",
          fontSize: "1.3rem",
          marginLeft: 0,
        }}
      >
        <img
          src={post.category.image}
          alt={post.category.name}
          style={{ padding: "3px 5px" }}
        />
        {post.category.name.toUpperCase()}
      </Label>
      <div style={{ marginTop: 20 }}>
        <Button
          name={post.slug}
          loading={reactionLoading}
          disabled={reactionLoading}
          style={{ marginRight: "15px", fontSize: "1.2rem" }}
          size="small"
          color={post.hasLiked ? "red" : "grey"}
          icon="heart"
          content={`${post.positiveReactionsCount} Likes`}
          onClick={() => {
            reactToPost(post.slug, post.id);
          }}
        />
        <ButtonGroup floated="right">
          <Button
            as="a"
            href={generateShareUrl(
              linkedInShareUrl,
              post.title,
              externalUrl(post.slug)
            )}
            icon="linkedin"
            color="linkedin"
            target="_blank"
          />
          <Button
            as="a"
            href={generateShareUrl(
              twitterShareUrl,
              post.title,
              externalUrl(post.slug)
            )}
            icon="twitter"
            color="twitter"
            target="_blank"
          />
          <Button
            as="a"
            onClick={() => copyToClipboard(externalUrl(post.slug))}
            icon="linkify"
            color="teal"
          />
        </ButtonGroup>
      </div>
    </Fragment>
  );
};

export default observer(PostDetailedInfo);

import React, { useContext, Fragment } from "react";
import { Item, Button, Popup, Grid, Image } from "semantic-ui-react";
import { IPost } from "../../../app/models/post";
import moment from "moment";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  copyToClipboard,
  generateShareUrl,
  internalUrl,
  linkedInShareUrl,
  externalUrl,
  twitterShareUrl,
} from "../../../app/common/util/util";
import { useMediaQuery } from "react-responsive";

interface IProps {
  post: IPost;
  reactionTarget: string;
}

const PostListItem: React.FC<IProps> = ({ post, reactionTarget }) => {
  const rootStore = useContext(RootStoreContext);
  const { reactionLoading, reactToPost, setPredicate } = rootStore.postStore;
  const { setActiveFilter, isDarkMode } = rootStore.commonStore;

  const isTablet = useMediaQuery({ query: "(max-width: 766px)" });

  return (
    <Item style={{ height: isTablet ? "" : "165 !important" }}>
      <Item.Image
        className="post-list-image"
        as={Link}
        to={internalUrl(post.slug)}
        size="medium"
        alt={post.title}
        src={post.image}
      />

      <Item.Content className="post-content">
        <Fragment>
          <Item.Header>
            <div className="posts-header">
              <Link to={internalUrl(post.slug)} style={{ width: "92%" }}>
                <h2
                  style={{
                    marginBottom: "0px",
                    fontSize: 20,
                    color: isDarkMode ? "#4a94e8" : "",
                  }}
                >
                  {post.title}
                </h2>
              </Link>

              <div
                style={{
                  marginRight: 1,
                }}
              >
                <Image
                  src={post.category.image}
                  alt={`${post.category.name} - ${post.category.code}.`}
                  onClick={() => {
                    setActiveFilter(post.category.code);
                    setPredicate("categoryCode", post.category.code);
                    window.scrollTo(0, 0);
                  }}
                  style={{ width: 21, height: 20, cursor: "Pointer" }}
                />
              </div>
            </div>
            <div style={{ marginTop: 5 }}>
              <time
                style={{
                  fontSize: "13px",
                  color: isDarkMode ? "#DFDFDF" : "",
                }}
              >
                {moment(post.publishDate).format("MMM Do YYYY")}
                <br />
                <span
                  style={{
                    color: isDarkMode ? "#DFDFDF" : "#121212",
                    fontStyle: "italic",
                  }}
                >
                  {post.timeToRead}
                </span>
              </time>
            </div>
          </Item.Header>
        </Fragment>
        <Item.Description style={{ color: isDarkMode ? "#DFDFDF" : "#121212" }}>
          {post.subTitle}
        </Item.Description>
        <Item.Extra className="post-buttons">
          <Button
            name={post.slug}
            loading={reactionLoading && reactionTarget === post.slug}
            disabled={reactionLoading && reactionTarget === post.slug}
            style={{ marginRight: "15px" }}
            size="small"
            color={post.hasLiked ? "red" : "grey"}
            icon="heart"
            content={`${post.positiveReactionsCount} Likes`}
            onClick={() => {
              reactToPost(post.slug, post.id);
            }}
          />

          <Popup
            style={{ transitionDuration: "0s", opactivity: "0.8" }}
            wide
            position="top right"
            trigger={
              <Button
                primary
                size="small"
                floated="right"
                icon="share"
                content="Share"
              />
            }
            on="click"
          >
            <Grid columns="equal">
              <Grid.Column style={{ padding: "5px" }}>
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
              </Grid.Column>
              <Grid.Column style={{ padding: "5px" }}>
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
              </Grid.Column>
              <Grid.Column style={{ padding: "5px" }}>
                <Button
                  as="a"
                  onClick={() => copyToClipboard(externalUrl(post.slug))}
                  icon="linkify"
                  color="teal"
                />
              </Grid.Column>
            </Grid>
          </Popup>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default observer(PostListItem);

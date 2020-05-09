import React from "react";
import { Item, Button, Popup, Grid, Container, Image } from "semantic-ui-react";
import { toast } from "react-toastify";
import { IPost } from "../../../app/models/post";


interface IProps {
  post: IPost;
}

const PostListItem: React.FC<IProps> = ({post}) => {
  const postUrl = `${window.location.origin}/${post.slug}`;
  let twitterShareUrl = "http://twitter.com/share?text=[TITLE]&url=[URL]";
  let linkedInShareUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=[URL]";

  const copyToClipboard = (postSlug: string) => {
    navigator.clipboard.writeText(postUrl);
    toast.success("Copied to clipboard.");
  };

  const generateShareUrl = (
    shareUrl: string,
    title: string,
    url: string
  ): string => {
    return encodeURI(shareUrl.replace("[TITLE]", title).replace("[URL]", url));
  };

  return (
    <Item style={{ marginBottom: "40px" }}>
      <Item.Image
        className="post-list-image"
        as="a"
        href={postUrl}
        size="medium"
        alt={post.title}
        src={post.image}
      />

      <Item.Content className="post-content">
        <Container>
          <Item.Header className="posts-header">
            <h2 style={{marginBottom: "0px"}}>
              <a href={postUrl}>{post.title}</a>
            </h2>
            <div style={{ display: "flex", alignItems: "flex-start",  }}>
              <Image
                href={postUrl}
                src={post.category.image}
                alt={post.category.name}
                style={{ width: "30px" }}
              />

            </div>
          </Item.Header>
        </Container>
        <Item.Description style={{marginTop: "3px"}}>
          {post.subTitle}
        </Item.Description>
        <Item.Extra className="post-buttons">
          <Button
            style={{ marginRight: "15px" }}
            size="small"
            color="red"
            icon="heart"
            content={`${post.positiveReactionsCount} Likes`}
          />
          {post.timeToRead}
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
                  href={generateShareUrl(linkedInShareUrl, "", postUrl)}
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
                    "This is a title",
                    postUrl
                  )}
                  icon="twitter"
                  color="twitter"
                  target="_blank"
                />
              </Grid.Column>
              <Grid.Column style={{ padding: "5px" }}>
                <Button
                  as="a"
                  onClick={() => copyToClipboard("post-slug")}
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

export default PostListItem;

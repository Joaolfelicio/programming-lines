import React, { SyntheticEvent } from "react";
import { Item, Button, Popup, Grid } from "semantic-ui-react";

const PostListItem = () => {

    function doSomething(event:SyntheticEvent)
    {
        console.log(event.cancelable);
    }


  return (
    <Item style={{ marginBottom: "40px" }}>
      <Item.Image
        className="post-list-image"
        as="a"
        size="medium"
        alt="insert post title here"
        src="https://res.cloudinary.com/joaolfelicio/image/upload/v1588499472/programming-lines/Posts/lorem-title.jpg"
      />

      <Item.Content className="post-content">
        <Item.Header as="h2">
          <a href="google.com">Title</a>
        </Item.Header>
        <Item.Description>
          Do velit est ex sit dolor. Minim quis ex mollit sunt aliquip labore.
          Nisi esse deserunt irure ullamco nisi fugiat. Do velit est ex sit
          dolor. Minim quis ex mollit sunt aliquip labore. Nisi esse deserunt
          irure ullamco nisi fugiat.
        </Item.Description>
        <Item.Extra className="post-buttons">
          <Button
            style={{ marginRight: "15px" }}
            size="small"
            color="red"
            icon="heart"
            content="3 Likes"
          />
          {"2 min read"}
          <Popup
          style={{transitionDuration: "0s", opactivity: "0.8"}}
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
            <Grid columns="equal" >
              <Grid.Column style={{padding: "5px"}}>
              <Button as="a" href={"https://www.google.com"} icon="linkedin" color="linkedin" />
              </Grid.Column>
              <Grid.Column style={{padding: "5px"}}>
                <Button as="a" href={"https://www.google.com"} icon="twitter" color="twitter" />
              </Grid.Column>
              <Grid.Column style={{padding: "5px"}}>
                <Button onClick={doSomething} icon="linkify" color="teal" />
              </Grid.Column>
            </Grid>
          </Popup>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default PostListItem;

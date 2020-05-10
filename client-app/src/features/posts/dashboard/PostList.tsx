import React, { Fragment, useContext } from "react";
import PostListItem from "./PostListItem";
import { ItemGroup, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const PostList = () => {
  const rootStore = useContext(RootStoreContext);
  const { postsByDate, reactionTarget } = rootStore.postStore;

  return (
    <Fragment>
      <ItemGroup>
        {postsByDate.map((post, index) => (
          <Fragment key={post.id}>
            <PostListItem reactionTarget={reactionTarget} post={post} />
            {postsByDate.length - 1 > index && (
              <Divider style={{ marginBottom: "20px", marginTop: "20px " }} />
            )}
          </Fragment>
        ))}
      </ItemGroup>
    </Fragment>
  );
};

export default observer(PostList);

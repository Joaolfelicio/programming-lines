import React, { Fragment, useContext } from "react";
import { IPost } from "../../../app/models/post";
import { observer } from "mobx-react-lite";
import { Header, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { history } from "../../../index";

interface IProps {
  post: IPost;
}

const PostDetailedHeader: React.FC<IProps> = ({ post }) => {
  const rootStore = useContext(RootStoreContext);
  const { adminUser } = rootStore.userStore;
  const { isDarkMode } = rootStore.commonStore;
  const { formatDeletionModal, setIsDeletionModalOpen } = rootStore.modalStore;

  return (
    <Fragment>
      <Header
        as="h1"
        content={post.title}
        style={{ fontSize: "2.9rem", color: isDarkMode ? "rgba(255, 255, 255, 0.87)" : "#121212" }}
      />
      <Header
        as="h2"
        style={{
          color: isDarkMode ? "rgba(255, 255, 255, 0.87)" : "rgb(100, 104, 109)",
          fontSize: "1.9rem",
        }}
        content={post.subTitle}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.45rem",
        }}
      >
        <div
          style={{
            color: isDarkMode ? "rgba(255, 255, 255, 0.87)" : "rgb(100, 104, 109)",
            fontSize: "1.15rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <time>{moment(post.publishDate).format("MMM Do YYYY")}</time>
          <span style={{ marginLeft: 3, marginRight: 3 }}>-</span>
          <em>{post.timeToRead}</em>
        </div>
        {adminUser && (
          <div>
            <Button
              negative
              size="small"
              onClick={() => {
                formatDeletionModal(
                  "Delete Post?",
                  `Are you sure that you want to delete the post "${post.title}"?`,
                  post.id,
                  "post"
                );
                setIsDeletionModalOpen(true);
              }}
            >
              Delete
            </Button>
            <Button
              primary
              size="small"
              onClick={() => history.push(`/admindashboard/posts/${post.slug}`)}
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      <Image
        fluid
        centered
        src={post.image}
        alt={post.title}
        style={{ marginBottom: "40px", borderRadius: "3px" }}
      />
    </Fragment>
  );
};

export default observer(PostDetailedHeader);

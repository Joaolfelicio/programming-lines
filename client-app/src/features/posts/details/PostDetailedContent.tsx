import React, { useContext } from "react";
import { IPost } from "../../../app/models/post";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import CodeBlock from "../../../app/common/syntaxHighlight/CodeBlock";
import "./style/MarkdownBodyStyle.css";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  post: IPost;
}

const PostDetailedContent: React.FC<IProps> = ({ post }) => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;

  return (
    <ReactMarkdown
      className={
        isDarkMode
          ? "markdown-body markdown-body-darkMode"
          : "markdown-body markdown-body-whiteMode"
      }
      source={post.content}
      skipHtml={false}
      escapeHtml={false}
      renderers={{
        code: CodeBlock,
      }}
    />
  );
};

export default observer(PostDetailedContent);

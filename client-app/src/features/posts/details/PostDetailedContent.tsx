import React from "react";
import { IPost } from "../../../app/models/post";
import { observer } from "mobx-react-lite";
import ReactMarkdown from "react-markdown";
import "github-markdown-css";
import CodeBlock from "../../../app/common/syntaxHighlight/CodeBlock";
import "./style/postDetailsStyle.css";

interface IProps {
  post: IPost;
}

const PostDetailedContent: React.FC<IProps> = ({ post }) => {

  return (

      <ReactMarkdown
        className="markdown-body"
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

import React, { useContext } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<IProps> = ({ language, value }) => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;

  if (!language) language = "javascript";
  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      language={language}
      style={isDarkMode ? atomOneDark : atomOneLight}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default observer(CodeBlock);

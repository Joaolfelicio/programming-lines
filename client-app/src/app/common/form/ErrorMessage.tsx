import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
  error: AxiosResponse;
  text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    <Message error>
      <Message.Header>{error.statusText}</Message.Header>
      {console.log(error)}
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List style={{margin: 0}}>
          {console.log(error.data.errors)}
          {Object.values(error.data.errors)
            .flat()
            .map((error, i) => (
              <Message.Item key={i}>{error as string}</Message.Item>
            ))}
        </Message.List>
      )}
      {text && <Message.Content content={text} />}
    </Message>
  );
};

export default observer(ErrorMessage);

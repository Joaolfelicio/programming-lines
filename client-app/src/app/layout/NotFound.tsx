import React, { useContext } from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../stores/rootStore";

const NotFound = () => {
  const rootStore = useContext(RootStoreContext);
  const { isDarkMode } = rootStore.commonStore;

  return (
    <Segment placeholder inverted={isDarkMode} style={{ marginTop: "20%" }}>
      <Header icon style={{ marginBottom: 50 }}>
        <Icon name="search" />
        Oops - Couldn't find what you were looking for.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/" primary>
          Return to the homepage
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;

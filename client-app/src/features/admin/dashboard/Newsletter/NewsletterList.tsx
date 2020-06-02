import React, { useContext, useEffect, Fragment } from "react";
import { Segment, Header, List, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import NewsletterListItem from "./NewsletterListItem";

const NewsletterList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    getNewsletters,
    newslettersByOrder,
    loadingNewsletter,
  } = rootStore.newsletterStore;

  useEffect(() => {
    getNewsletters();
  }, [getNewsletters]);

  return (
    <Segment raised loading={loadingNewsletter}>
      <Header
        content="Newsletter List"
        size="huge"
        style={{ marginTop: 10, marginBottom: 10 }}
      />
      <List divided verticalAlign="middle">
        {newslettersByOrder.map((newsletter) => (
          <Fragment key={newsletter.id}>
            <NewsletterListItem newsletter={newsletter}/>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Segment>
  );
};

export default observer(NewsletterList);

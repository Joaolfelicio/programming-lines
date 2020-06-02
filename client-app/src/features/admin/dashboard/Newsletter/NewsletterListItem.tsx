import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { INewsletter } from "../../../../app/models/newsletter";
import { List, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import moment from "moment";

interface IProps {
  newsletter: INewsletter;
}

const NewsletterListItem: React.FC<IProps> = ({ newsletter }) => {
  const rootStore = useContext(RootStoreContext);
  const { formatDeletionModal, setIsDeletionModalOpen } = rootStore.modalStore;

  return (
    <div
      style={{
        marginTop: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <List.Content
        style={{
          marginLeft: 5,
          width: 350,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ width: 170 }}>{newsletter.displayName}</span>
        <span style={{ fontStyle: "italic" }}>{newsletter.email}</span>
      </List.Content>

      <List.Content style={{display: "flex", alignItems: "center" }}>
        <time
          style={{ fontStyle: "italic"}}
        >
          {moment(newsletter.subscriptionDate).format("MMM Do YYYY")}
        </time>
      </List.Content>
      <div>
        <Button
          negative
          size="small"
          onClick={() => {
            formatDeletionModal(
              "Remove user from the newsletter list?",
              `Are you sure that you want to remove ${newsletter.email} from the newsletter list?`,
              newsletter.id,
              "newsletter"
            );
            setIsDeletionModalOpen(true);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default observer(NewsletterListItem);

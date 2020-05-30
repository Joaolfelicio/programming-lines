import React, { useContext } from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const DeletionModal = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    isDeletionModalOpen,
    deletionHeaderMessage,
    deletionContentMessage,
    deleteObject,
    setIsDeletionModalOpen,
    deletionLoading,
  } = rootStore.modalStore;

  return (
    <Modal
      open={isDeletionModalOpen}
      basic
      size="small"
      style={{left: "35vh"}}
    >
      <Header icon="archive" content={deletionHeaderMessage} />
      <Modal.Content>
        <p>{deletionContentMessage}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setIsDeletionModalOpen(false)}> No</Button>
        <Button color="red" onClick={deleteObject} loading={deletionLoading}>
          <Icon name="remove" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default observer(DeletionModal);

import React, { Fragment, useState, useEffect, useContext } from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

interface IProps {
  loading: boolean;
  uploadImage: (file: Blob) => void;
}

export const PhotoUploadWidget: React.FC<IProps> = ({
  loading,
  uploadImage,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { newPostImageUrl, setNewPostImageUrl } = rootStore.adminStore;

  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      {files.length === 0 && <PhotoWidgetDropzone setFiles={setFiles} />}
      {files.length > 0 && (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            {files.map((file) => (
              <img
                key={file.name}
                src={file.preview}
                className="img-preview"
                style={{
                  height: 305,
                  width: 670,
                  overflow: "hidden",
                  border: "dashed 3px",
                  borderColor: "#eee",
                  margin: 15,
                  borderRadius: 5
                }}
              />
            ))}
          </div>
          <Button
            as="button"
            positive
            icon="check"
            content="Upload"
            loading={loading}
            disabled={newPostImageUrl.length! > 0}
            onClick={() => uploadImage(files[0]!)}
            floated="right"
            style={{ marginRight: 15 }}
          />
          <Button
            disabled={loading}
            onClick={() => {
              setFiles([]);
              setNewPostImageUrl("");
            }}
            content="Clear"
            floated="right"
            style={{ marginRight: 5 }}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);

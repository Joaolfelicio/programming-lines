import React, { Fragment, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./ImageWidgetDropzone";

interface IProps {
  loading: boolean;
  imageUrl: string;
  uploadImage: (file: Blob) => void;
  setImageUrl: (url: string) => void;
}

export const ImageUploadWidget: React.FC<IProps> = ({
  loading,
  uploadImage,
  imageUrl,
  setImageUrl
}) => {
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
                alt={file.name + "."}
              />
            ))}
          </div>
          <Button
            as="button"
            positive
            icon="check"
            content="Upload"
            loading={loading}
            disabled={imageUrl.length! > 0}
            onClick={() => uploadImage(files[0]!)}
            floated="right"
            style={{ marginRight: 15 }}
          />
          <Button
            disabled={loading}
            onClick={() => {
              setFiles([]);
              setImageUrl("");
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

export default observer(ImageUploadWidget);

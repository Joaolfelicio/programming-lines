import React, { Fragment, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export const PhotoUploadWidget: React.FC<IProps> = ({
  loading,
  uploadPhoto,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <PhotoWidgetDropzone setFiles={setFiles} />

      {files.length > 0 && (
        <Fragment>
          <div
            className="img-preview"
          />
          <Button.Group widths={2}>
            <Button
              positive
              icon="check"
              loading={loading}
              onClick={() => uploadPhoto(image!)}
            />
            <Button
              disabled={loading}
              onClick={() => setFiles([])}
              icon="close"
            />
          </Button.Group>
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);

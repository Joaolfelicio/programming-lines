import React, { Fragment, useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "./ImageWidgetDropzone"

interface IProps {
  setImageFiles: (files: any[]) => void;
  imageFiles: any[];
  width: number;
  height: number;
}

export const ImageUploadWidget: React.FC<IProps> = ({
  setImageFiles,
  imageFiles,
  width,
  height,
}) => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      {imageFiles.length === 0 && (
        <PhotoWidgetDropzone
          setFiles={setImageFiles}
          width={width}
          height={height}
        />
      )}
      {imageFiles.length > 0 && (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            {imageFiles.map((file) => (
              <img
                key={file.name}
                src={file.preview}
                className="img-preview"
                style={{
                  height: height,
                  width: width,
                  overflow: "hidden",
                  border: "dashed 3px",
                  borderColor: "#eee",
                  margin: 15,
                  borderRadius: 5,
                }}
                alt={file.name + "."}
              />
            ))}
          </div>
          <Button
            disabled={imageFiles.length === 0}
            onClick={() => {
              console.log(imageFiles[0]);
              setImageFiles([]);
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

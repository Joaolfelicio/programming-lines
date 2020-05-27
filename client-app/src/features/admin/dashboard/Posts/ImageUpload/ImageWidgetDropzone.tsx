import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
    border: "dashed 3px",
    borderColor: "#eee",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
    textAlign: "center" as "center",
    height: 305,
    width: 670,
    margin: "15px auto"
}

const dropzoneActive = {
    borderColor: "green"
}

const ImageWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: Object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, [setFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles} >
      <input {...getInputProps()} />
      
      <Icon name="upload" size="huge"/>
      <Header content="Drop image here" />
      
    </div>
  );
};

export default ImageWidgetDropzone;

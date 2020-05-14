import React from "react";
import { Dimmer } from "semantic-ui-react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

interface IProps {
  inverted?: boolean;
}

const LoadingComponent: React.FC<IProps> = ({ inverted }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader
        type="Bars"
        color="#00BFFF"
        height={50}
        width={50}
        timeout={3000}
      />
      <p style={{ marginTop: 12.5, opacity: 0.5 }}>Loading...</p>
    </Dimmer>
  );
};

export default LoadingComponent;

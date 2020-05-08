import React, { useContext, useEffect, Fragment } from "react";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import NavBar from "../../features/nav/NavBar";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoading, setAppLoading } = rootStore.commonStore;

  useEffect(() => {
    // set or get the fingerprint
    // get localstorage isDarkMode
    setAppLoading();
  }, [setAppLoading, appLoading]);

  if (appLoading) {
    return <LoadingComponent content="Loading app..." />;
  }

  return (
    <Fragment>
      <NavBar activeItem="posts" />
      <PostDashboard />
    </Fragment>
  );
};

export default observer(App);

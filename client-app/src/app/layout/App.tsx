import React, { useContext, useEffect, Fragment } from "react";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import NavBar from "../../features/nav/NavBar";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoading } = rootStore.commonStore;
  const { setAnonymousUser } = rootStore.userStore;
  const { isDarkMode } = rootStore.commonStore;

  useEffect(() => {
    setAnonymousUser();
  }, [setAnonymousUser]);

  if (appLoading) {
    return <LoadingComponent inverted={isDarkMode} content="Loading app..." />;
  }

  return (
    <Fragment>
      <NavBar activeItem="posts" />
      <PostDashboard />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default observer(App);

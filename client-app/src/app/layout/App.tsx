import React, { useContext, useEffect, Fragment } from "react";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./AppLoadingComponent";
import { observer } from "mobx-react-lite";
import NavBar from "../../features/nav/NavBar";
import PostDashboard from "../../features/posts/dashboard/PostDashboard";
import { ToastContainer } from "react-toastify";
import Newsletter from "../../features/newsletter/Newsletter";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import PostsDetails from "../../features/posts/details/PostsDetails";
import { Container } from "semantic-ui-react";
import NotFound from "./NotFound";
import AboutMeComponent from "../../features/aboutme/AboutMeComponent";
import AdminLogin from "../../features/admin/AdminLogin";

const App: React.FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoading } = rootStore.commonStore;
  const { loginAnonymousUser } = rootStore.userStore;
  const { isDarkMode } = rootStore.commonStore;
  const { setSearchablePosts } = rootStore.postStore;

  useEffect(() => {
    loginAnonymousUser();
    setSearchablePosts();
  }, [loginAnonymousUser, setSearchablePosts]);

  if (appLoading) {
    return <LoadingComponent inverted={isDarkMode} />;
  }

  return (
    <Fragment>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
        <Switch>
          <Route exact path="/" component={PostDashboard} />
          <Route path="/aboutme" component={AboutMeComponent} />
          <Route path="/post/:slug" component={PostsDetails} />
          <Route path="/admin" component={AdminLogin} />
          <Route component={NotFound} />
        </Switch>
        <Route exact path={["/", "/post/:slug", "/aboutme"]}  component={Newsletter} />
      </Container>
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

export default withRouter(observer(App));

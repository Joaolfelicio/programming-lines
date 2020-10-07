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
import { Segment } from "semantic-ui-react";
import NotFound from "./NotFound";
import AboutMeComponent from "../../features/aboutme/AboutMeComponent";
import AdminLogin from "../../features/admin/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../../features/admin/dashboard/AdminDashboard";
import DeletionModal from "../common/modal/DeletionModal";

const App: React.FC<RouteComponentProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const { appLoading, isDarkMode, token } = rootStore.commonStore;
  const { loginAnonymousUser, getUser } = rootStore.userStore;
  const { setSearchablePosts } = rootStore.postStore;

  useEffect(() => {
    loginAnonymousUser();
    setSearchablePosts();

    if (token) {
      getUser();
    }
  }, [loginAnonymousUser, setSearchablePosts, token, getUser]);

  if (appLoading) {
    return <LoadingComponent inverted={isDarkMode} />;
  }

  return (
    <Fragment>
      <DeletionModal />
      <NavBar />
      <Segment
        style={{
          paddingTop: "5em",
          border: 0,
          borderRadius: 0,
          marginBottom: 0,
          marginTop: 0,
          minHeight: "100vh",
        }}
        inverted={isDarkMode}
      >
        <Switch>
          <Route exact path="/" component={PostDashboard} />
          <Route path="/aboutme" component={AboutMeComponent} />
          <Route path="/post/:slug" component={PostsDetails} />
          <Route exact path="/admin" component={AdminLogin} />
          <PrivateRoute path="/admindashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
        <Route
          exact
          path={["/", "/post/:slug", "/aboutme"]}
          component={Newsletter}
        />
      </Segment>
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

import React, { Fragment, useState, useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import AdminPosts from "./Posts/AdminPosts";
import AdminCategories from "./Categories/AdminCategories";
import AdminNewsletter from "./Newsletter/AdminNewsletter";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { history } from "../../../index";

const AdminDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { getCategories } = rootStore.categoryStore;
  const [activeAdminDashboard, setActiveAdminDashboard] = useState("Posts");

  useEffect(() => {
    getCategories();
    history.push("/admindashboard/posts");
  }, [getCategories, history]);

  document.title = "Programming Lines - Admin";

  return (
    <Fragment>
      <Menu pointing secondary style={{ width: 730, margin: "10px auto" }}>
        <Menu.Item
          name="Posts"
          active={activeAdminDashboard === "Posts"}
          onClick={() => {
            history.push("/admindashboard/posts");
            setActiveAdminDashboard("Posts");
          }}
        />
        <Menu.Item
          name="Categories"
          active={activeAdminDashboard === "Categories"}
          onClick={() => {
            history.push("/admindashboard/categories");
            setActiveAdminDashboard("Categories");
          }}
        />
        <Menu.Item
          name="Newsletter"
          active={activeAdminDashboard === "Newsletter"}
          onClick={() => {
            history.push("/admindashboard/newsletter");
            setActiveAdminDashboard("Newsletter");
          }}
        />
      </Menu>

      <div style={{ width: 730, margin: "0 auto" }}>
        {activeAdminDashboard === "Posts" ? (
          <AdminPosts />
        ) : activeAdminDashboard === "Categories" ? (
          <AdminCategories />
        ) : (
          <AdminNewsletter />
        )}
      </div>
    </Fragment>
  );
};

export default AdminDashboard;

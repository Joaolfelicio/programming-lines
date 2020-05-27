import React, { Fragment, useState, useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import AdminPosts from "./Posts/AdminPosts";
import AdminCategories from "./Categories/AdminCategories";
import AdminNewsletter from "./Newsletter/AdminNewsletter";
import { RootStoreContext } from "../../../app/stores/rootStore";

const AdminDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {getCategories} = rootStore.categoryStore;
  const [activeAdminDashboard, setActiveAdminDashboard] = useState("Posts");

  useEffect(() => {
    getCategories();
  }, [getCategories])

  return (
    <Fragment>
      <Menu pointing secondary style={{ width: 730, margin: "10px auto" }}>
        <Menu.Item
          name="Posts"
          active={activeAdminDashboard === "Posts"}
          onClick={() => setActiveAdminDashboard("Posts")}
        />
        <Menu.Item
          name="Categories"
          active={activeAdminDashboard === "Categories"}
          onClick={() => setActiveAdminDashboard("Categories")}
        />
        <Menu.Item
          name="Newsletter"
          active={activeAdminDashboard === "Newsletter"}
          onClick={() => setActiveAdminDashboard("Newsletter")}
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

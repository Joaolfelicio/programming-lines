import React, {Fragment, useState } from "react";
import { Menu } from "semantic-ui-react";
import AdminPosts from "./Posts/AdminPosts";
import AdminCategories from "./Categories/AdminCategories";
import AdminNewsletter from "./Newsletter/AdminNewsletter";

const AdminDashboard = () => {
  const [activeAdminDashboard, setActiveAdminDashboard] = useState("Posts");

  return (
    <Fragment>
      <Menu pointing secondary>
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

      {activeAdminDashboard === "Posts" ? (
        <AdminPosts />
      ) : activeAdminDashboard === "Categories" ? (
        <AdminCategories />
      ) : (
        <AdminNewsletter />
      )}
    </Fragment>
  );
};

export default AdminDashboard;

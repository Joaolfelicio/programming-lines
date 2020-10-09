import React, { useContext, Fragment, useState } from "react";
import { Menu, Search } from "semantic-ui-react";
import DarkModeToggle from "react-dark-mode-toggle";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useHistory, Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const rootStore = useContext(RootStoreContext);
  const { setIsDarkMode, isDarkMode, setActiveFilter } = rootStore.commonStore;
  const {
    postsBySearchTerm,
    setPostsBySearchTerm,
    loadingPosts,
    setPredicate,
  } = rootStore.postStore;
  const { adminUser } = rootStore.userStore;

  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();


  return (
    <Fragment>
      <Menu
        fixed="top"
        style={{
          borderRadius: "0px",
          height: 50,
          borderBottom: isDarkMode ? "1px solid rgb(64,64,64)" : "",
        }}
        inverted={isDarkMode}
        borderless
      >
        <Menu.Item
          as={Link}
          to="/"
          onClick={() => {
            setActiveFilter("Recent");
            setPredicate("all", "recent");
            window.scrollTo(0, 0);
          }}
          style={{ alignItems: "center" }}
        >
          <img src="/assets/logo.png" alt="Programming blog logo." />
          {/* If we are seeing a detailed post, the blog name should be h2, if we are in the homepage the blog post should be h1 */}
          {history.location.pathname === "/" ? (
            <h1 className="post-header">Programming Lines</h1>
          ) : (
            <h2 className="post-header">Programming Lines</h2>
          )}
        </Menu.Item>

        <Menu.Item position="right">
          <Search
            id="searchBox"
            results={postsBySearchTerm!}
            loading={loadingPosts}
            fluid
            onResultSelect={(e, data) => {
              history.push(`/post/${data.result.slug}`);
              setSearchInput("");
              document.getElementById("searchBox")!.blur();
            }}
            value={searchInput}
            size="small"
            placeholder="Search posts..."
            //TODO: Fix this:
            className={isDarkMode ? "search-box-darkMode" : "search-box"}
            onSearchChange={(e, data) => {
              setPostsBySearchTerm(data.value!);
              setSearchInput(data.value!);
            }}
            minCharacters={2}
            noResultsDescription="Try searching by post title or topic."
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/"
            name="Posts"
            active={
              location.pathname.endsWith("/post") || location.pathname === "/"
            }
          />
          <Menu.Item
            as={Link}
            to="/aboutme"
            name="About me"
            active={location.pathname.endsWith("/aboutme")}
          />
          {adminUser && (
            <Menu.Item
              as={Link}
              to="/admindashboard"
              name="Admin"
              active={location.pathname.includes("/admin")}
            />
          )}
          <Menu.Item>
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={50}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
};

export default observer(NavBar);

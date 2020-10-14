import React, { useContext, Fragment, useState } from "react";
import { Menu, Search } from "semantic-ui-react";
import DarkModeToggle from "react-dark-mode-toggle";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useHistory, Link, useLocation } from "react-router-dom";
import "./style/NavBarStyle.css";
import { useMediaQuery } from "react-responsive";

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
  const isTablet = useMediaQuery({ query: "(max-width: 780px)" });
  const isPhone = useMediaQuery({ query: "(max-width: 747px)" });
  const isSmallerPhone = useMediaQuery({ query: "(max-width: 646px)" });
  const isXsPhone = useMediaQuery({ query: "(max-width: 390px)" });

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
          style={{
            alignItems: "center",
            paddingRight: isXsPhone ? 7 : "",
            paddingLeft: isXsPhone ? 7 : "",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Programming blog logo."
            style={{ margin: "center" }}
          />
          {/* If we are seeing a detailed post, the blog name should be h2, if we are in the homepage the blog post should be h1 */}
          {history.location.pathname === "/" ? (
            <h1
              className="post-header"
              style={{
                fontSize: isTablet ? 16 : "",
                textAlign: "center",
                display: isPhone ? "none" : "block",
              }}
            >
              Programming Lines
            </h1>
          ) : (
            <h2
              className="post-header"
              style={{
                fontSize: isTablet ? 16 : "",
                textAlign: "center",
                display: isPhone ? "none" : "block",
              }}
            >
              Programming Lines
            </h2>
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
            size="tiny"
            placeholder="Search posts..."
            //TODO: Fix this:
            className={
              isDarkMode ? "search-box search-box-darkMode" : "search-box"
            }
            onSearchChange={(e, data) => {
              setPostsBySearchTerm(data.value!);
              setSearchInput(data.value!);
            }}
            minCharacters={2}
            noResultsDescription="Try searching by post title or topic."
            style={{
              paddingRight: isXsPhone ? 3 : "",
              paddingLeft: isXsPhone ? 3 : "",
            }}
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
            style={{ display: isSmallerPhone ? "none" : "" }}
          />
          <Menu.Item
            as={Link}
            to="/aboutme"
            name="About me"
            active={location.pathname.endsWith("/aboutme")}
            style={{ display: isSmallerPhone ? "none" : "" }}
          />
          {adminUser && (
            <Menu.Item
              as={Link}
              to="/admindashboard"
              name="Admin"
              active={location.pathname.includes("/admin")}
              style={{ display: isSmallerPhone ? "none" : "" }}
            />
          )}
          <Menu.Item
            style={{
              paddingRight: isXsPhone ? 10 : "",
              paddingLeft: isXsPhone ? 0 : "",
            }}
          >
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

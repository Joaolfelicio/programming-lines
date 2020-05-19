import React, { useContext, Fragment } from "react";
import { Menu, Search } from "semantic-ui-react";
import DarkModeToggle from "react-dark-mode-toggle";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useHistory, Link } from "react-router-dom";

interface IProps {
  activeItem: string | null;
}

const NavBar: React.FC<IProps> = ({ activeItem }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setIsDarkMode,
    isDarkMode,
    activeNavItem,
    setActiveNavItem,
    setActiveFilter,
  } = rootStore.commonStore;
  const {
    postsBySearchTerm,
    setPostsBySearchTerm,
    loadingPosts,
    setPredicate,
  } = rootStore.postStore;

  const history = useHistory();

  const headerStyle = {
    marginLeft: "15px",
    marginTop: "0px",
    fontSize: "20px",
  };

  return (
    <Fragment>
      <Menu
        fixed="top"
        style={{ borderRadius: "0px", height: 50 }}
        inverted={isDarkMode}
        borderless
      >
        <Menu.Item
          as={Link}
          to="/"
          onClick={() => {
            setActiveFilter("Recent");
            setPredicate("all", "recent");
          }}
          style={{ alignItems: "center" }}
        >
          <img src="/assets/logo.png" alt="Programming blog logo." />
          {/* If we are seeing a detailed post, the blog name should be h2, if we are in the homepage the blog post should be h1 */}
          {history.location.pathname.includes("/post/") ? (
            <h2 style={headerStyle}>Programming Lines</h2>
          ) : (
            <h1 style={headerStyle}>Programming Lines</h1>
          )}
        </Menu.Item>

        <Menu.Item position="right">
          <Search
            results={postsBySearchTerm!}
            loading={loadingPosts}
            fluid
            onResultSelect={(e, data) => {
              console.log(toJS(data.result));
              history.push(`/post/${data.result.slug}`);
              //TODO: Fix this
              data.value = "";
            }}
            size="small"
            placeholder="Search posts..."
            className="search-box"
            onSearchChange={(e, data) => {
              setPostsBySearchTerm(data.value!);
            }}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="Posts"
            active={activeNavItem === "posts"}
            onClick={() => setActiveNavItem("posts")}
          />
          <Menu.Item
            name="About me"
            active={activeNavItem === "aboutme"}
            onClick={() => setActiveNavItem("aboutme")}
          />
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

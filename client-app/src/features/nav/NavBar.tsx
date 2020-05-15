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
  } = rootStore.commonStore;
  const {
    postsBySearchTerm,
    setPostsBySearchTerm,
    loadingPosts,
  } = rootStore.postStore;

  const history = useHistory();

  return (
    <Fragment>
      <Menu
        fixed="top"
        style={{ borderRadius: "0px", height: 50 }}
        inverted={isDarkMode}
        borderless
      >
        <Menu.Item as={Link} to="/" style={{ alignItems: "center" }}>
          <img src="/assets/logo.png" alt="Joao Felicio blog logo." />
          <h1
            style={{ marginLeft: "15px", marginTop: "0px", fontSize: "20px" }}
          >
            Programming Lines
          </h1>
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

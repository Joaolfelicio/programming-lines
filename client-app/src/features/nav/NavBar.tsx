import React, { useContext } from "react";
import { Menu, Input } from "semantic-ui-react";
import DarkModeToggle from "react-dark-mode-toggle";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activeItem: string | null;
}

const NavBar: React.FC<IProps> = ({ activeItem }) => {

  const rootStore = useContext(RootStoreContext);
  const {setIsDarkMode, isDarkMode, activeNavItem, setActiveNavItem} = rootStore.commonStore;

  return (
    <Menu style={{borderRadius: "0px"}} inverted={isDarkMode} borderless>
      <Menu.Item style={{ alignItems: "center" }}>
        <img src="/assets/logo.png" alt="Joao Felicio blog logo." />
        <h1 style={{ marginLeft: "15px", marginTop: "0px", fontSize: "20px" }}>
          Programming Lines
        </h1>
      </Menu.Item>

      <Menu.Item position="right">
        <Input icon="search" placeholder="Search posts..." style={{width: "300px"}} />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item name="Posts" active={activeNavItem === "posts"} onClick={() => setActiveNavItem("posts")} />
        <Menu.Item name="About me" active={activeNavItem === "aboutme"} onClick={() => setActiveNavItem("aboutme")} />
        <Menu.Item> 
          <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={50} speed={1.7} />
          </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default observer(NavBar);

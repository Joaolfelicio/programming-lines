import React, { Fragment, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import "./style/BurgerMenuStyle.css";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";

const MenuBurger = () => {
  return (
      //TODO: Finish this
    <Menu>
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="about" className="menu-item" href="/about">About</a>
    <a id="contact" className="menu-item" href="/contact">Contact</a>
    <a className="menu-item--small" href="">Settings</a>
  </Menu>
  );
};

export default observer(MenuBurger);

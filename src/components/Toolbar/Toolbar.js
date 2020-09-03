import React from "react";
import classes from "./Toolbar.module.css";

import Menu from "./Menu/Menu";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems"

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <Menu click={props.openSidebar} />
      <nav className={classes.Nav}>
        <NavigationItems linkTo="/">Home</NavigationItems>
        <NavigationItems linkTo="/explore">Explore</NavigationItems>
        <NavigationItems linkTo="/library">Library</NavigationItems>
      </nav>
    </header>
  );
};

export default toolbar;

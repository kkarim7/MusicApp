import React from "react";
import classes from "./Toolbar.module.css";

import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const toolbar = (props) => {
  let navItems = [
    <NavigationItems key="0" linkTo="/" click={props.logout}>
      Home
    </NavigationItems>,
  ];

  if (props.auth !== null) {
    navItems.push();
  }
  return (
    <header className={classes.Toolbar}>
      <nav className={classes.Nav}>{navItems}</nav>
    </header>
  );
};

export default toolbar;

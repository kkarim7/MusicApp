import React from "react";
import classes from "./Toolbar.module.css";

import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const toolbar = (props) => {
  let navItems = [
    <NavigationItems key="home" linkTo="/">
      Home
    </NavigationItems>,
  ];

  if (props.auth !== null) {
    navItems = [
      <NavigationItems key="library" linkTo="/library">
        Library
      </NavigationItems>,
      <NavigationItems key="profile" linkTo="/profile">
        Profile
      </NavigationItems>,
    ];
  }
  return (
    <header className={classes.Toolbar}>
      <nav className={classes.Nav}>{navItems}</nav>
    </header>
  );
};

export default toolbar;

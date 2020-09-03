import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem sidebar={props.sidebar} link={props.linkTo} clicked={props.click}>
      {props.children}
    </NavigationItem>
  </ul>
);

export default navigationItems;

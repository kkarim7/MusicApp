import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  let styleProp = classes.NavigationItem;

  if (props.sidebar) {
    styleProp = classes.SidebarNavigationItem;
  }

  return (
    <li className={styleProp}>
      <NavLink exact to={props.link} activeClassName={classes.active} onClick={props.clicked}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;

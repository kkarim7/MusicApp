import React from "react";

import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import classes from "./Sidebar.module.css";

import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sidebar = (props) => {
  let attachedClasses = [classes.Sidebar, classes.Close];

  if (props.sidebar) {
    attachedClasses = [classes.Sidebar, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.sidebar} clicked={props.closeSidebar} />
      <div className={attachedClasses.join(" ")}>
        <h4 className={classes.CloseBtn} onClick={props.closeSidebar}>
          x
        </h4>
        <NavigationItems sidebar linkTo="/profile" click={props.closeSidebar}>
          Profile
        </NavigationItems>
        <NavigationItems sidebar linkTo="/recent" click={props.closeSidebar}>
          Recent
        </NavigationItems>
      </div>
    </Aux>
  );
};

export default sidebar;

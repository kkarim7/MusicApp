import React from "react";

import classes from "./Menu.module.css";
import Aux from "../../../hoc/Aux/Aux";

const menu = (props) => {
  let content = (
    <Aux>
      <div></div>
      <div></div>
      <div></div>
    </Aux>
  );

  return (
    <div className={classes.Menu} onClick={props.click}>
      {content}
    </div>
  );
};

export default menu;

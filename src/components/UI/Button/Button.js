import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./Button.module.css";

const button = (props) => (
  <Aux>
    <button className={props.circle ? classes.ButtonCircle : classes.Button} onClick={props.clicked}>{props.children}</button>
  </Aux>
);

export default button;

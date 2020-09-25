import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./Button.module.css";

const button = (props) => {
  let attachedClasses = classes.Button;

  if (props.circle) {
    attachedClasses = classes.ButtonCircle;
  }

  return (
    <Aux>
      <button className={attachedClasses} onClick={props.clicked}>
        {props.children}
      </button>
    </Aux>
  );
};

export default button;

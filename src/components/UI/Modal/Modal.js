import React from "react";

import classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  let attachedClasses = [classes.Modal, classes.Close];

  if (props.show) {
    attachedClasses = [classes.Modal, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.ModalContent}>{props.children}</div>
      </div>
    </Aux>
  );
};

export default modal;

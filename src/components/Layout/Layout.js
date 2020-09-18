import React from "react";
import Aux from "../../hoc/Aux/Aux";

import Toolbar from "../Toolbar/Toolbar";

const layout = (props) => {
  return (
    <Aux>
      <Toolbar auth={props.auth} logout={props.logout} />
    </Aux>
  );
};

export default layout;

import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";

import Toolbar from "../../components/Toolbar/Toolbar";
import Sidebar from "../../components/Toolbar/Sidebar/Sidebar";

class Layout extends Component {
  state = {
    showSidebar: false,
  };

  showSidebarHandler = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  closeSidebarHandler = () => {
    this.setState({ showSidebar: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar openSidebar={this.showSidebarHandler} />
        <Sidebar
          sidebar={this.state.showSidebar}
          closeSidebar={this.closeSidebarHandler}
        />
      </Aux>
    );
  }
}

export default Layout;

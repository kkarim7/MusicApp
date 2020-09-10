import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Layout from "./containers/Layout/Layout";
import Main from "./containers/Main/Main";
import Explore from "./components/Explore/Explore";
import Library from "./components/Library/Library";
import Profile from "./components/Profile/Profile";
import Recent from "./components/Recent/Recent";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/recent" component={Recent} />
        <Route path="/profile" component={Profile} />
        <Route path="/explore" component={Explore} />
        <Route path="/library" component={Library} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className="App">
        <Layout />
        {routes}
      </div>
    );
  }
}

export default App;

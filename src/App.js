import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "firebase";
import "./App.css";

import Main from "./containers/Main/Main";
import Profile from "./components/Profile/Profile";
import Library from "./components/Library/Library";

class App extends Component {
  render() {
    const config = {
      apiKey: "ENTER API KEY",
      databaseURL: "ENTER DB PATH",
      storageBucket: "ENTER STORAGE PATH",
    };
    firebase.initializeApp(config);

    let routes = (
      <Switch>
        {localStorage.getItem("userId") !== null ? (
          <Route path="/profile" component={Profile} />
        ) : null}
        {localStorage.getItem("token") !== null ? (
          <Route path="/library" component={Library} />
        ) : null}
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
    return <div className="App">{routes}</div>;
  }
}

export default App;

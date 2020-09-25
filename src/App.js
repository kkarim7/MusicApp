import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import firebase from "firebase";
import "./App.css";

import Main from "./containers/Main/Main";
// import Profile from "./components/Profile/Profile";

class App extends Component {
  render() {
    const config = {
      apiKey: "ENTER API KEY",
      databaseURL: "DB URL",
      storageBucket: "STORAGE LOCATION",
    }
    firebase.initializeApp(config)

    let routes = (
      <Switch>
        {/* <Route path="/profile" component={Profile} /> */}
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    );
    return <div className="App">{routes}</div>;
  }
}

export default App;

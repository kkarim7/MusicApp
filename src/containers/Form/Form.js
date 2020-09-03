import React, { Component } from "react";

import classes from "./Form.module.css";

class Form extends Component {
  formHandler = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <form className={classes.Form} onSubmit={this.formHandler}>
          <div className={classes.Input}>
            <label className={classes.Label}>Enter a valid email</label>
            <input type="email" />
          </div>
          <div className={classes.Input}>
            <label className={classes.Label}>Enter a valid password</label>
            <input type="password" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

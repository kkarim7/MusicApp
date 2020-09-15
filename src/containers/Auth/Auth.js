import React, { Component } from "react";
import axios from "axios";
import classes from "./Auth.module.css";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Load from "../../components/UI/Load/Load";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    load: false,
    error: null,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  authSuccess = (token, userId) => {
    this.setState({
      load: false,
    });
    return {
      idToken: token,
      userId: userId,
    };
  };

  authFail = (error) => {
    this.setState({
      load: false,
      error: error.message,
    });
  };

  authSendHandler = (email, password, isSignup) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const API_key = "ENTER API KEY HERE";
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      API_key;
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_key;
    }
    axios
      .post(url, authData)
      .then((response) => {
        this.authSuccess(response.data.idToken, response.data.localId);
      })
      .catch((error) => {
        this.authFail(error.response.data.error);
      });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.authSendHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.props.signUp
    );
    this.setState({
      controls: {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your email address",
          },
          value: "",
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Your password",
          },
          value: "",
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
      load: true,
      error: null,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        label={formElement.config.elementConfig.placeholder}
      />
    ));

    if (this.state.load) {
      form = <Load />;
    }

    let errorMessage = null;

    if (this.state.error) {
      errorMessage = <p>{this.state.error}</p>;
    }

    return (
      <div className={classes.Auth}>
        {this.props.signUp ? <h1>SIGN UP</h1> : <h1>SIGN IN</h1>}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button>SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;

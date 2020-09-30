import React, { Component } from "react";
import axios from "axios";

import classes from "./Main.module.css";
import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";

import Modal from "../../components/UI/Modal/Modal";
import Load from "../../components/UI/Load/Load";
import Input from "../../components/UI/Input/Input";
import Layout from "../../components/Layout/Layout";
import { checkValidity } from "../../shared/utility";
import { Redirect } from "react-router-dom";

class Main extends Component {
  state = {
    showModal: false,
    signUp: false,
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
    token: null,
    userId: null,
    load: false,
    error: null,
  };

  modalToggleHandler = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      error: null,
    }));
  };

  signUpHandler = () => {
    this.setState({ signUp: true });
  };

  signInHandler = () => {
    this.setState({ signUp: false });
  };

  // ***AUTH STARTS***
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  authSuccess = (idToken, userId, expiration) => {
    const expirationDate = new Date(new Date().getTime() + expiration * 1000);
    this.setState({
      load: false,
      token: idToken,
      userId: userId,
    });
    localStorage.setItem("token", idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", userId);
    console.log("AUTH SUCCESS");
  };

  authFail = (error) => {
    this.setState({
      load: false,
      error: error,
    });
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null,
    });
    console.log("AUTH LOGOUT");
    return <Redirect to="/" />;
  };

  checkAuthTimeout = (expireTime) => {
    setTimeout(() => {
      this.logout();
    }, expireTime * 1000);
  };

  authSendHandler = (email, password, isSignup) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const API_key = "ENTER API KEY";
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
        this.authSuccess(
          response.data.idToken,
          response.data.localId,
          response.data.expiresIn
        );
        this.checkAuthTimeout(response.data.expiresIn);
      })
      .catch((error) => {
        this.authFail(error.response.data.error.message);
      });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.authSendHandler(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUp
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
  // *** AUTH END ***

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
      <Aux>
        {this.state.token ? (
          <Redirect to="/library" />
        ) : (
          <Aux>
            <Layout auth={this.state.token} />
            <Modal
              show={this.state.showModal}
              clicked={this.modalToggleHandler}
            >
              <div>
                {this.state.signUp ? <h1>SIGN UP</h1> : <h1>SIGN IN</h1>}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                  {form}
                  {this.state.load ? null : <Button>SUBMIT</Button>}
                </form>
              </div>
            </Modal>
            <div className={[classes.Main, classes.Background].join(" ")}>
              <h2>Music for you, by you</h2>
            </div>
            <div>
              <Button
                clicked={() => {
                  this.modalToggleHandler();
                  this.signUpHandler();
                }}
              >
                SIGN UP
              </Button>
              <Button
                clicked={() => {
                  this.modalToggleHandler();
                  this.signInHandler();
                }}
              >
                SIGN IN
              </Button>
            </div>
          </Aux>
        )}
      </Aux>
    );
  }
}
export default Main;

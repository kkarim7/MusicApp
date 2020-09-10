import React, { Component } from "react";
import classes from "./Main.module.css";
import Aux from "../../hoc/Aux/Aux";
import Button from "../../components/UI/Button/Button";

import Modal from "../../components/UI/Modal/Modal";
import Auth from "../Auth/Auth";

class Main extends Component {
  state = {
    showModal: false,
    signUp: false,
  };

  modalToggleHandler = () => {
    // this.setState({ showModal: true });
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  signUpHandler = () => {
    this.setState({ signUp: true });
  };

  signInHandler = () => {
    this.setState({ signUp: false });
  };

  // modalCloseHandler = () => {
  //   this.setState({ showModal: false });
  // };

  render() {
    return (
      <Aux>
        <Modal show={this.state.showModal} clicked={this.modalToggleHandler}>
          {this.state.signUp ? <Auth signUp /> : <Auth />}
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
    );
  }
}
export default Main;

import React, { Component } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import Aux from "../../hoc/Aux/Aux";

import classes from "./Profile.module.css";
import image from "./Image/user.png";

import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  state = {
    uploads: [],
    modal: false,
    tokenPresent: true,
  };

  componentDidMount = () => {
    const queryParams = "?auth=" + localStorage.getItem("token");
    axios
      .get(
        "https://music-to-go-app.firebaseio.com/library/songs.json" +
          queryParams
      )
      .then((res) => {
        const fetchedUploads = [];
        for (let key in res.data) {
          if (res.data[key].userId === localStorage.getItem("userId")) {
            fetchedUploads.push({ ...res.data[key], id: key });
          }
        }
        this.setState({ loading: false, uploads: fetchedUploads });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  logout = () => {
    console.log("Logged Out");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    this.setState({ tokenPresent: false });
  };

  modalHandler = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    if (localStorage.getItem("token") === null) {
      return <Redirect to="/" />;
    }

    let content = (
      <div>
        <h2>No Uploads Available</h2>
      </div>
    );

    if (this.state.uploads) {
      content = this.state.uploads.map((upload) => (
        <div className={classes.Pill} key={upload.id}>
          <audio title={upload.song} controls src={upload.songURL}></audio>
          <h4>Artist: {upload.artist}</h4>
          <h4>Album: {upload.album}</h4>
          <h4>Song: {upload.song}</h4>
        </div>
      ));
    }

    return (
      <Aux>
        {this.state.tokenPresent ? (
          <div className={classes.Profile}>
            <Layout />
            <Modal show={this.state.modal} clicked={this.modalHandler}>
              <div>
                <h3>Are you sure you want to Logout?</h3>
                <div className={classes.LogoutModal}>
                  <Button clicked={this.modalHandler}>CANCEL</Button>
                  <Button clicked={this.logout}>LOGOUT</Button>
                </div>
              </div>
            </Modal>
            <img
              className={classes.ProfilePic}
              alt="User Profile"
              src={image}
            />
            <div>
              <small>
                Icons made by{" "}
                <a
                  href="https://www.flaticon.com/authors/becris"
                  title="Becris"
                >
                  Becris
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </small>
            </div>
            <div>
              <h2>Uploads</h2>
              <h4>{content}</h4>
            </div>
            <div className={classes.Logout}>
              <Button clicked={this.modalHandler}>LOGOUT</Button>
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </Aux>
    );
  }
}

export default Profile;

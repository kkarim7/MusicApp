import React, { Component } from "react";
import axios from "axios";

import classes from "./Library.module.css";

import Aux from "../../hoc/Aux/Aux";
import Modal from "../UI/Modal/Modal";
import Load from "../UI/Load/Load";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { checkValidity } from "../../shared/utility";

class Library extends Component {
  state = {
    songs: [],
    controls: {
      artist: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Artist",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      album: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Album",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      song: {
        elementType: "input",
        elementConfig: {
          type: "input",
          placeholder: "Song",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      // upload: {
      //   elementType: "file",
      //   elementConfig: {
      //     type: "file",
      //   },
      //   value: "",
      //   validation: {
      //     required: true,
      //   },
      //   valid: false,
      // },
    },
    modal: false,
    load: false,
  };

  componentDidMount = () => {
    const queryParams = "?auth=" + this.props.token;
    axios
      .get(
        "DB LIBRARY" +
          queryParams
      )
      .then((response) => {
        const fetchedSongs = [];
        for (let key in response.data) {
          fetchedSongs.push({ ...response.data[key], id: key });
        }
        this.setState({ songs: fetchedSongs });
        console.log(fetchedSongs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  modalToggleHandler = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    const post = {
      artist: this.state.controls.artist.value,
      album: this.state.controls.album.value,
      song: this.state.controls.song.value,
    };

    this.setState({ load: true });

    axios
      .post("DB LIBRARY", post)
      .then((response) => {
        console.log("POST SENT");
        this.componentDidMount();
        this.setState({
          load: false,
          modal: false,
          controls: {
            artist: {
              elementType: "input",
              elementConfig: {
                type: "input",
                placeholder: "Artist",
              },
              value: "",
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
            },
            album: {
              elementType: "input",
              elementConfig: {
                type: "input",
                placeholder: "Album",
              },
              value: "",
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
            },
            song: {
              elementType: "input",
              elementConfig: {
                type: "input",
                placeholder: "Song",
              },
              value: "",
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
            },
          },
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ load: false, modal: false });
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

    let content = (
      <div>
        <h4>Please add some songs</h4>
      </div>
    );

    if (this.state.songs) {
      content = this.state.songs.map((song) => (
        <div className={classes.Pill} key={song.id}>
          <h4>Artist: {song.artist}</h4>
          <h4>Album: {song.album}</h4>
          <h4>Song: {song.song}</h4>
        </div>
      ));
    }

    return (
      <Aux>
        <h1 className={classes.Library}>Music Library</h1>
        <Modal show={this.state.modal} clicked={this.modalToggleHandler}>
          <form onSubmit={this.onSubmitHandler}>
            {form}
            {this.state.load ? null : <Button>UPLOAD</Button>}
          </form>
        </Modal>
        <div>{content}</div>
        <Button circle clicked={this.modalToggleHandler}>
          +
        </Button>
      </Aux>
    );
  }
}

export default Library;

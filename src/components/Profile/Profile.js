import React from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const profile = (props) => (
  <div>
    <h1>(Photo) My Profile</h1>
    <p>Please select an audio file to upload</p>
    <Input elementType="file"></Input>
    <Button>Upload</Button>
  </div>
);

export default profile;

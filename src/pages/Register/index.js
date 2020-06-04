import React, { Component } from "react";
import serializeForm from "form-serialize";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ImageInput from "../../components/ImageInput";

import { mapUserToSave } from "./mapper";

import { addNewUser } from "../../redux/actionCreators/user";

import "./styles.scss";

class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    this.props.addNewUser(mapUserToSave(values));
  };

  render() {
    return (
      <div className="register-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Control type="text" name="name" placeholder="Enter email" />
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={65}
          />
          <Button type="submit">save</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addNewUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Register);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import serializeForm from "form-serialize";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ImageInput from "../../components/ImageInput";
import Card from "../../components/Card";

import { mapUserToSave } from "./mapper";

import { addNewUser, setIsLoadingFlag } from "../../redux/actionCreators/user";

import "./styles.scss";

class Register extends Component {
  handleSubmit = (e) => {
    const { route, setIsLoadingFlag } = this.props;
    e.preventDefault();
    setIsLoadingFlag(true);
    const values = serializeForm(e.target, { hash: true });

    this.props.addNewUser(mapUserToSave(values)).then((response) => {
      route.history.push("/");
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div className="register-container">
        {isLoading && (
          <div className="register-container__loading">
            <div className="register-container__loading__icon">
              <Spinner animation="border" role="status" />
            </div>
          </div>
        )}
        <Card title="Register">
          <div className="register-container__body">
            <Form onSubmit={this.handleSubmit}>
              <div className="register-container__user-image">
                <ImageInput
                  name="avatarURL"
                  className="create-contact-avatar-input"
                />
              </div>
              <Form.Control
                className="register-container__user-name"
                type="text"
                name="name"
                required
                placeholder="Full Name"
              />
              <Button type="submit" className="register-container__action">
                Register
              </Button>
            </Form>
          </div>
        </Card>
        <div className="register-container__login">
          <span>Have an account?</span> <Link to="/login">Login Now!</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addNewUser(user)),
    setIsLoadingFlag: (isLoading) => dispatch(setIsLoadingFlag(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

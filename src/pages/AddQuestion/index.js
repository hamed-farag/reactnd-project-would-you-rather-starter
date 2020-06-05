import React, { Component } from "react";
import { connect } from "react-redux";
import serializeForm from "form-serialize";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { addNewQuestion } from "../../redux/actionCreators/question";

import "./styles.scss";

export class AddQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { loggedInUser, addNewQuestion, route } = this.props;
    const values = serializeForm(e.target, { hash: true });
    if (values.optionOne && values.optionTwo) {
      addNewQuestion(values.optionOne, values.optionTwo, loggedInUser.id).then(
        (respose) => {
          route.history.push("/");
        }
      );
    }
  };

  render() {
    return (
      <div className="add-question-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Control
            required
            type="text"
            name="optionOne"
            placeholder="Enter Option One Text Here"
          />
          Or
          <Form.Control
            required
            type="text"
            name="optionTwo"
            placeholder="Enter Option Two Text Here"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewQuestion: (optionOneText, optionTwoText, authorId) =>
      dispatch(addNewQuestion(optionOneText, optionTwoText, authorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);

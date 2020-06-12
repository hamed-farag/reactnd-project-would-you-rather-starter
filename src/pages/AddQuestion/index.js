import React, { Component } from "react";
import { connect } from "react-redux";
import serializeForm from "form-serialize";
import Spinner from "react-bootstrap/Spinner";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Card from "../../components/Card";

import {
  addNewQuestion,
  setIsLoadingFlag,
} from "../../redux/actionCreators/question";

import "./styles.scss";

export class AddQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      loggedInUser,
      addNewQuestion,
      route,
      setQuestionIsLoadingFlag,
    } = this.props;
    setQuestionIsLoadingFlag(true);
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
    const { isLoading } = this.props;

    return (
      <div className="add-question-container">
        {isLoading && (
          <div className="add-question-container__loading">
            <div className="add-question-container__loading__icon">
              <Spinner animation="border" role="status" />
            </div>
          </div>
        )}
        <Card title="Add New Question?">
          <div className="add-question-container__body">
            <Form onSubmit={this.handleSubmit}>
              <h3>Would you rather ...</h3>
              <div className="add-question-container__form-body">
                <Form.Control
                  required
                  type="text"
                  name="optionOne"
                  placeholder="Enter Option One Text Here"
                />
                <div className="add-question-container__separator">Or</div>
                <Form.Control
                  required
                  type="text"
                  name="optionTwo"
                  placeholder="Enter Option Two Text Here"
                />
              </div>
              <Button type="submit" className="add-question-container__action">
                Submit
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    );
  }

  componentWillUnmount() {
    const { setIsLoadingFlag } = this.props;
    setIsLoadingFlag(false);
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser,
    isLoading: state.questions.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewQuestion: (optionOneText, optionTwoText, authorId) =>
      dispatch(addNewQuestion(optionOneText, optionTwoText, authorId)),
    setQuestionIsLoadingFlag: (isLoading) =>
      dispatch(setIsLoadingFlag(isLoading)),
    setIsLoadingFlag: (isLoading) => dispatch(setIsLoadingFlag(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);

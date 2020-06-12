import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

import Card from "../../components/Card";

import {
  getQuestions,
  updateQuestionAnswer,
  setIsLoadingFlag,
} from "../../redux/actionCreators/question";

import "./styles.scss";

export class QuestionDetails extends Component {
  componentDidMount() {
    const { questions, getAllQuestions } = this.props;

    if (questions.length === 0) {
      getAllQuestions();
    }
  }

  getQuestion = () => {
    const { route, questions } = this.props;
    if (route.match && route.match.params) {
      return questions.find(
        (question) => question.id === route.match.params.id
      );
    }
    return null;
  };

  getUser(question) {
    const { users } = this.props;
    if (question) {
      return users.find((user) => user.id === question.author);
    }
  }

  getData() {
    const question = this.getQuestion();
    const author = this.getUser(question);
    return {
      author,
      question,
    };
  }

  // check if user answer the question or not
  getLoggedUserAnswerQuestion({ question }) {
    const { loggedInUser } = this.props;
    let chosenChoice = null;

    const isOptionOneAnswered = question.optionOne.votes.findIndex(
      (vote) => vote === loggedInUser.id
    );
    if (isOptionOneAnswered !== -1) {
      return (chosenChoice = "optionOne");
    }

    const isOptionTwoAnswered = question.optionTwo.votes.findIndex(
      (vote) => vote === loggedInUser.id
    );

    if (isOptionTwoAnswered !== -1) {
      return (chosenChoice = "optionTwo");
    }

    return chosenChoice;
  }

  handleChoiceClick = (questionId, choice) => {
    const {
      getAllQuestions,
      updateQuestionAnswer,
      loggedInUser,
      setIsLoadingFlag,
    } = this.props;

    setIsLoadingFlag(true);
    updateQuestionAnswer(questionId, choice, loggedInUser.id).then(
      (response) => {
        getAllQuestions();
      }
    );
  };

  renderQuestion({ question, author }) {
    return (
      <div className="question-details-container__question">
        <div className="question-details-container__question__user">
          <img src={author.avatarURL} alt={author.name} />
        </div>
        <div className="question-details-container__question__choices">
          <h3>Would you rather</h3>
          <div className="mb-3">
            <Form.Check
              name="poll"
              type="radio"
              value="optionOne"
              id={question.optionOne.text}
              label={<span>{question.optionOne.text}</span>}
              onChange={(e) =>
                this.handleChoiceClick(question.id, e.target.value)
              }
            />
          </div>
          <div className="mb-3">
            <Form.Check
              name="poll"
              type="radio"
              value="optionTwo"
              id={question.optionTwo.text}
              label={<span>{question.optionTwo.text}</span>}
              onChange={(e) =>
                this.handleChoiceClick(question.id, e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  }

  getAnswersNumber = (option) => {
    return option.votes.length;
  };

  renderResults({ question, author }, userChoice) {
    const { users } = this.props;
    return (
      <div className="question-details-container__result">
        <div className="question-details-container__question__user">
          <img src={author.avatarURL} alt={author.name} />
        </div>
        <div className="question-details-container__result__body">
          <h3>Result</h3>
          <div
            className={`question-details-container__result__choice ${
              userChoice === "optionOne" && "chosen"
            }`}
          >
            <Card>
              {userChoice === "optionOne" && "optionONe"}
              <h4>{`Would you rahter ${question.optionOne.text}`}</h4>
              <ProgressBar
                striped
                variant="success"
                now={
                  (this.getAnswersNumber(question.optionOne) * 100) /
                  users.length
                }
              />
              {`${this.getAnswersNumber(question.optionOne)} of ${
                users.length
              } votes`}
            </Card>
          </div>
          <div
            className={`question-details-container__result__choice ${
              userChoice === "optionTwo" && "chosen"
            }`}
          >
            <Card>
              {userChoice === "optionTwo" && "optionTWo"}
              <h4>{`Would you rahter ${question.optionTwo.text}`}</h4>
              <ProgressBar
                striped
                variant="success"
                now={
                  (this.getAnswersNumber(question.optionTwo) * 100) /
                  users.length
                }
              />
              {`${this.getAnswersNumber(question.optionTwo)} of ${
                users.length
              } votes`}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { questions, isLoading } = this.props;
    if (questions.length > 0) {
      const questionData = this.getData();
      const userChoice = this.getLoggedUserAnswerQuestion(questionData);

      return isLoading ? (
        <div className="question-details-container__loading">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div className="question-details-container">
          <Card title={questionData.author.name}>
            {userChoice !== null
              ? this.renderResults(questionData, userChoice)
              : this.renderQuestion(questionData)}
          </Card>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    isLoading: state.questions.isLoading,
    users: state.users.users,
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getQuestions()),
    updateQuestionAnswer: (questionId, answer, userId) =>
      dispatch(updateQuestionAnswer(questionId, answer, userId)),
    setIsLoadingFlag: (isLoading) => dispatch(setIsLoadingFlag(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);

// get question object from state
// get user fromm state based on author property in the question to render his name
// check if user answer this question or not
// if yes, render the result
// else, render the choices as radio buttons

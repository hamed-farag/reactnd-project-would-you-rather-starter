import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

import Card from "../../components/Card";

import {
  getQuestions,
  updateQuestionAnswer,
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
  checkLoggedUserAnswerQuestion({ question }) {
    const { loggedInUser } = this.props;

    const isOptionOneAnswered = question.optionOne.votes.findIndex(
      (vote) => vote === loggedInUser.id
    );
    const isOptionTwoAnswered = question.optionTwo.votes.findIndex(
      (vote) => vote === loggedInUser.id
    );

    if (isOptionOneAnswered !== -1 || isOptionTwoAnswered !== -1) {
      return true;
    }

    return false;
  }

  handleChoiceClick = (questionId, choice) => {
    const { getAllQuestions, updateQuestionAnswer, loggedInUser } = this.props;

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

  renderResults({ question, author }) {
    return <div className="question-details-container__result"></div>;
  }

  render() {
    const { questions } = this.props;
    if (questions.length > 0) {
      const questionData = this.getData();
      const isAnsweredQuestion = this.checkLoggedUserAnswerQuestion(
        questionData
      );

      return (
        <div className="question-details-container">
          <Card title={questionData.author.name}>
            {isAnsweredQuestion
              ? this.renderResults(questionData)
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
    questions: state.questions,
    users: state.users.users,
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getQuestions()),
    updateQuestionAnswer: (questionId, answer, userId) =>
      dispatch(updateQuestionAnswer(questionId, answer, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);

// get question object from state
// get user fromm state based on author property in the question to render his name
// check if user answer this question or not
// if yes, render the result
// else, render the choices as radio buttons

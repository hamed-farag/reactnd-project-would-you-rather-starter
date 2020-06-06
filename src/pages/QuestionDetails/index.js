import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

export class QuestionDetails extends Component {
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

  renderQuestion({ question, author }) {
    console.info(question, author);
  }

  renderResults({ question, author }) {
    console.info(question, author);
  }

  render() {
    const questionData = this.getData();
    const isAnsweredQuestion = this.checkLoggedUserAnswerQuestion(questionData);

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
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    users: state.users.users,
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);

// get question object from state
// get user fromm state based on author property in the question to render his name
// check if user answer this question or not
// if yes, render the result
// else, render the choices as radio buttons

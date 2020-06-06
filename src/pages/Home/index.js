import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "react-toggle";

import { getQuestions } from "../../redux/actionCreators/question";

import "react-toggle/style.css";
import "./styles.scss";

export class Home extends Component {
  state = {
    isAnswerQuestions: false,
  };
  componentDidMount() {
    const { getAllQuestions } = this.props;
    getAllQuestions();
  }

  getAnsweredQuestions(questions, loggedInUser) {
    return questions.filter((ques) => {
      if (ques.optionOne && ques.optionOne.votes.length > 0) {
        const index = ques.optionOne.votes.findIndex(
          (vote) => vote === loggedInUser.id
        );
        return index === -1 ? false : true;
      }
      if (ques.optionTwo && ques.optionTwo.votes.length > 0) {
        const index = ques.optionTwo.votes.findIndex(
          (vote) => vote === loggedInUser.id
        );
        return index === -1 ? false : true;
      }
      return false;
    });
  }

  getUnAnsweredQuestions(questions, loggedInUser) {
    return questions.filter((ques) => {
      if (ques.optionOne && ques.optionOne.votes.length > 0) {
        const index = ques.optionOne.votes.findIndex(
          (vote) => vote === loggedInUser.id
        );
        return index !== -1 ? false : true;
      }
      if (ques.optionTwo && ques.optionTwo.votes.length > 0) {
        const index = ques.optionTwo.votes.findIndex(
          (vote) => vote === loggedInUser.id
        );
        return index !== -1 ? false : true;
      }
      return false;
    });
  }

  filterQuestion = (questions, showAnsweredQuestions) => {
    const { loggedInUser } = this.props;

    if (showAnsweredQuestions) {
      return this.getAnsweredQuestions(questions, loggedInUser);
    } else {
      return this.getUnAnsweredQuestions(questions, loggedInUser);
    }
  };

  handleToggleChange = (e) => {
    this.setState({
      isAnswerQuestions: e.target.checked,
    });
  };

  render() {
    const { isAnswerQuestions } = this.state;
    const { questions } = this.props;
    const filteredQuestions = this.filterQuestion(questions, isAnswerQuestions);

    return (
      <div className="home-container">
        <span>Show Answered Questions</span>
        <Toggle
          defaultChecked={this.state.isAnswerQuestions}
          onChange={this.handleToggleChange}
        />
        <br />
        {filteredQuestions.map((question) => JSON.stringify(question))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    loggedInUser: state.users.loggedInUser,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getQuestions()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import Button from "react-bootstrap/Button";

import Card from "../../components/Card";

import { getQuestions } from "../../redux/actionCreators/question";

import { getAnsweredQuestions, getUnAnsweredQuestions } from "./helpers";

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

  filterQuestion = (questions, showAnsweredQuestions) => {
    const { loggedInUser } = this.props;

    if (showAnsweredQuestions) {
      return getAnsweredQuestions(questions, loggedInUser);
    } else {
      return getUnAnsweredQuestions(questions, loggedInUser);
    }
  };

  handleToggleChange = (e) => {
    this.setState({
      isAnswerQuestions: e.target.checked,
    });
  };

  renderQuestionCard = (question) => {
    const { users, route } = this.props;

    const user = users.find((user) => user.id === question.author);

    return (
      <Card title={`${user.name} asks`}>
        <div className="home-container__poll">
          <div className="home-container__user">
            <img src={user.avatarURL} alt={user.name}></img>
          </div>
          <div className="home-container__body">
            <h3>Would you rather</h3>
            <span className="home-container__poll__option">
              {`... ${question.optionOne.text} ...`}
            </span>
            <Button
              className="home-container__poll__details"
              onClick={() => route.history.push(`/questions/${question.id}`)}
            >
              View Poll
            </Button>
          </div>
        </div>
      </Card>
    );
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
        {filteredQuestions.map((question) => this.renderQuestionCard(question))}
      </div>
    );
  }
  F;
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

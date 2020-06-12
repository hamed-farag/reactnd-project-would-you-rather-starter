import React, { Component } from "react";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Card from "../../components/Card";

import {
  getQuestions,
  setIsLoadingFlag,
} from "../../redux/actionCreators/question";

import { getAnsweredQuestions, getUnAnsweredQuestions } from "./helpers";

import "react-toggle/style.css";
import "./styles.scss";

export class Home extends Component {
  state = {
    isAnswerQuestions: false,
  };

  componentDidMount() {
    const { setIsLoadingFlag, isLoading } = this.props;
    const { getAllQuestions, questions } = this.props;
    if (questions.length === 0) {
      if (isLoading === false) {
        setIsLoadingFlag(true);
      }
      getAllQuestions();
    }
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
      <div className="home-container__question" key={question.id}>
        <Card title={`${user.name} asks`}>
          <div className="home-container__poll">
            <div className="home-container__user">
              <img src={user.avatarURL} alt={user.name}></img>
            </div>
            <div className="home-container__poll__body">
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
      </div>
    );
  };

  render() {
    const { isAnswerQuestions } = this.state;
    const { questions, isLoading } = this.props;
    const filteredQuestions = this.filterQuestion(questions, isAnswerQuestions);

    return isLoading ? (
      <div className="home-container__loading">
        <Spinner animation="border" role="status" />
      </div>
    ) : (
      <div className="home-container">
        <div className="home-container__filter">
          <span className="home-container__title">
            {isAnswerQuestions ? "Answered Questions" : "UnAnswered Questions"}
          </span>
          <span>Show Answered Questions</span>
          <Toggle
            defaultChecked={this.state.isAnswerQuestions}
            onChange={this.handleToggleChange}
            className="home-container__toggle"
          />
        </div>
        <hr />
        {!isLoading && filteredQuestions.length === 0 ? (
          <div className="home-container__loading">{"No Questions Found!"}</div>
        ) : (
          filteredQuestions.map((question) => this.renderQuestionCard(question))
        )}
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
    questions: state.questions.questions,
    isLoading: state.questions.isLoading,
    loggedInUser: state.users.loggedInUser,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getQuestions()),
    setIsLoadingFlag: (isLoading) => dispatch(setIsLoadingFlag(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

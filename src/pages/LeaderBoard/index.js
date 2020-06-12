import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import Card from "../../components/Card";

import { getUsers, setIsLoadingFlag } from "../../redux/actionCreators/user";

import "./styles.scss";

class LeaderBoard extends Component {
  componentDidMount() {
    const { getAllUsers, setIsLoadingFlag } = this.props;
    setIsLoadingFlag(true);
    getAllUsers();
  }

  renderScores(user) {
    const answersCount = Object.keys(user.answers).length;
    const questionsCount = user.questions.length;

    return (
      <Card>
        <div className="leaderboard-container__body">
          <div className="leaderboard-container__body__image">
            <img src={user.avatarURL} alt={user.name} />
          </div>
          <div className="leaderboard-container__body__result">
            <h2>{user.name}</h2>
            <div className="leaderboard-container__body__statistics">
              <div className="leaderboard-container__body__counts">
                <span>
                  <b>Answered Questions</b>
                </span>
                <span>
                  <b>{answersCount}</b>
                </span>
              </div>
              <hr />
              <div className="leaderboard-container__body__counts">
                <span>
                  <b>Created Questions</b>
                </span>
                <span>
                  <b>{questionsCount}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="leaderboard-container__body__score">
            <Card title="Score">
              <div className="leaderboard-container__body__total">
                {answersCount + questionsCount}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    );
  }

  render() {
    const { users, isLoading } = this.props;

    const sortedUsers = users.sort((userA, userB) => {
      const answersCountUserA = Object.keys(userA.answers).length;
      const questionsCountUserA = userA.questions.length;

      const answersCountUserB = Object.keys(userB.answers).length;
      const questionsCountUserB = userB.questions.length;

      return (
        answersCountUserB +
        questionsCountUserB -
        (answersCountUserA + questionsCountUserA)
      );
    });

    return isLoading ? (
      <div className="leaderboard-container__loading">
        <div className="leaderboard-container__loading__icon">
          <Spinner animation="border" role="status" />
        </div>
      </div>
    ) : (
      <div className="leaderboard-container">
        {sortedUsers.map((user) => (
          <div className="leaderboard-container__user" key={user.id}>
            {this.renderScores(user)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  isLoading: state.users.isLoading,
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getUsers()),
    setIsLoadingFlag: (isLoading) => dispatch(setIsLoadingFlag(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);

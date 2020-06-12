import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import "./styles.scss";

class LeaderBoard extends Component {
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
    const { users } = this.props;
    return (
      <div className="leaderboard-container">
        {users.map((user) => (
          <div className="leaderboard-container__user">
            {this.renderScores(user)}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(LeaderBoard);

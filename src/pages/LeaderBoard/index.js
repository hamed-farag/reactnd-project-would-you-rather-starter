import React from "react";
import { connect } from "react-redux";

function LeaderBoard(props) {
  return <div className="leaderboard-container"></div>;
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  questions: state.questions,
});

export default connect(mapStateToProps)(LeaderBoard);

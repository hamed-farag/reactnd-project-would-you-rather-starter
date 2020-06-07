import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.scss";

export default function (props) {
  const { actions, data } = props;
  const logOutUser = () => {
    actions.logOutUser();
  };

  const renderUser = (user) => {
    return (
      <div className="app-header__user">
        <span className="app-header__user-name">{user.name}</span>
        <img
          src={user.avatarURL}
          alt={user.name}
          className="app-header__user-avatar"
        />
      </div>
    );
  };

  return (
    <div className="app-header">
      <div className="app-header__start-section">
        <NavLink
          activeClassName="app-header__link--active"
          to="/"
          className="app-header__link"
        >
          Home
        </NavLink>
        <NavLink
          activeClassName="app-header__link--active"
          to="/questions/add"
          className="app-header__link"
        >
          New Question
        </NavLink>
        <NavLink
          activeClassName="app-header__link--active"
          to="/leaderboard"
          className="app-header__link"
        >
          Leadr Board
        </NavLink>
      </div>
      <div className="app-header__end-section">
        {renderUser(data.user)}
        <span onClick={logOutUser} className="app-header__link">
          Log out
        </span>
      </div>
    </div>
  );
}

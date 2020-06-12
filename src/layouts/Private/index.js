import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";

import { removeLoggedInUser } from "../../redux/actionCreators/user";

import "./styles.scss";

class PrivateLayout extends Component {
  componentDidMount() {
    this.checkAndRedirect();
  }

  // if user click on logout button we need to check again for user
  componentDidUpdate() {
    this.checkAndRedirect();
  }

  checkAndRedirect() {
    const { loggedInUser, route } = this.props;
    const pathname = route.location.pathname;
    if (!loggedInUser) {
      route.history.push(
        `/login${pathname.trim() !== "" ? `?redirecturl=${pathname}` : ""}`
      );
    }
  }

  render() {
    const { children, loggedInUser, logOutUser } = this.props;
    return (
      <div className="private-layout-container">
        <Header
          data={{ user: loggedInUser }}
          actions={{
            logOutUser,
          }}
        />
        {loggedInUser && (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="private-layout-container__body">{children}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(removeLoggedInUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateLayout);

// connect to store, get logged in user, else redirect to login

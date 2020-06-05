import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";

import { removeLoggedInUser } from "../../redux/actionCreators/user";

class PrivateLayout extends Component {
  componentDidMount() {
    const { loggedInUser, route } = this.props;
    if (!loggedInUser) {
      route.history.push("/login");
    }
  }

  // if user click on logout button we need to check again for user
  componentDidUpdate() {
    const { loggedInUser, route } = this.props;
    if (!loggedInUser) {
      route.history.push("/login");
    }
  }

  render() {
    const { children, loggedInUser, logOutUser } = this.props;
    return (
      <div>
        <Header
          data={{ user: loggedInUser }}
          actions={{
            logOutUser,
          }}
        />
        {children}
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

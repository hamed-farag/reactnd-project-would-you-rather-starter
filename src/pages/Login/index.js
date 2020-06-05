import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Select from "react-select";

import Card from "../../components/Card";

import { getUsers, setLoggedInUser } from "../../redux/actionCreators/user";

import "./styles.scss";

const UserComponent = ({ innerProps, data }) => {
  return (
    <div {...innerProps}>
      <img src={data.avatarURL} alt={data.name} />
      {data.name}
    </div>
  );
};

class Login extends Component {
  state = {
    selectedOption: {
      label: "Select User",
    },
    selectedUser: null,
  };

  componentDidMount() {
    const { getAllUsers, loggedInUser, route } = this.props;
    // if user not logged in, get all users
    if (!loggedInUser) {
      getAllUsers();
    } else {
      // if user already logged in, redirect him to home page "/"
      route.history.push("/");
    }
  }

  handleSelectChange = (value) => {
    this.setState({
      selectedOption: {
        value: value.name,
        label: value.name,
      },
      selectedUser: value,
    });
  };

  handleOnClick = (e) => {
    const { selectedUser } = this.state;
    const { route } = this.props;

    if (selectedUser) {
      this.props.setLoggedInUser(selectedUser);
      route.history.push("/");
    }
  };

  render() {
    const { selectedUser } = this.state;

    return (
      <div className="login-container">
        <Card>
          <Select
            onChange={this.handleSelectChange}
            options={this.props.users}
            value={this.state.selectedOption}
            components={{ Option: (props) => <UserComponent {...props} /> }}
          />
          <Button
            disabled={selectedUser ? false : true}
            onClick={this.handleOnClick}
          >
            Log In
          </Button>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loggedInUser: state.users.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getUsers()),
    setLoggedInUser: (user) => dispatch(setLoggedInUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// check if user already loggin redirect him to home "/"

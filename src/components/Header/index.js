import React, { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./styles.scss";

export default function (props) {
  const { actions, data } = props;
  const logOutUser = () => {
    actions.logOutUser();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/questions/add">New Question</Link>
          <Link to="/leaderboard">Leadr Board</Link>
          <Nav.Link href="#home">{JSON.stringify(data.user)}</Nav.Link>
          <Link onClick={logOutUser}>Log out</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

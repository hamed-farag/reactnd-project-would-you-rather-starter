import React, { Component } from "react";

export default class PrivateLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <span>Private Layout</span>
        {children}
      </div>
    );
  }
}

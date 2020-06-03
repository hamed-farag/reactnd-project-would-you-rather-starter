import React, { Component } from "react";

export default class PublicLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <span>Public Layout</span>
        {children}
      </div>
    );
  }
}

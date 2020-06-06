import React, { Component } from "react";

export default class PublicLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="public-layout-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12"> {children}</div>
          </div>
        </div>
      </div>
    );
  }
}

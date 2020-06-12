import React from "react";

import Header from "../../components/Header";

import "./styles.scss";

export default function PublicLayout(props) {
  const { children } = props;
  return (
    <div className="public-layout-container">
      <Header data={{ user: null }} />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="public-layout-container__body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

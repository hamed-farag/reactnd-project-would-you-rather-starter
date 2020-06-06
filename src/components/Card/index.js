import React from "react";

import "./styles.scss";

export default function Card(props) {
  return (
    <div className="card-container">
      {props.title && (
        <div className="card-container__header">{props.title}</div>
      )}
      <div className="card-container__body">{props.children}</div>
    </div>
  );
}

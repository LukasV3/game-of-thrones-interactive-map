import React from "react";
import "./styles.scss";

class InfoPanel extends React.Component {
  render() {
    return (
      <div ref="container" className="info-container">
        <div
          ref="title"
          onClick={() => this.refs.container.classList.toggle("info-active")}
          className="info-title"
        >
          <h1>Nothing Selected</h1>
        </div>
        <div className="info-body">
          <div className="info-content-container">
            <div ref="content" className="info-content"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoPanel;

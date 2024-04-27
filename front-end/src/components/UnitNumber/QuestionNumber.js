import React, { Component } from "react";

class QuestionNumber extends Component {

  displayElement = () => {
    switch (this.props.code) {
      case "one":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_1.png"
              width="50%"
            ></img>
          </a>
        );
      case "two":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_2.png"
              width="50%"
            ></img>
          </a>
        );
      case "three":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_3.png"
              width="50%"
            ></img>
          </a>
        );
      case "four":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_4.png"
              width="50%"
            ></img>
          </a>
        );
      case "five":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_5.png"
              width="50%"
            ></img>
          </a>
        );
      case "six":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_6.png"
              width="50%"
            ></img>
          </a>
        );
      case "seven":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_7.png"
              width="50%"
            ></img>
          </a>
        );
      case "eight":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_8.png"
              width="50%"
            ></img>
          </a>
        );
      case "nine":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_9.png"
              width="50%"
            ></img>
          </a>
        );
      case "zero":
        return (
          <a>
            <img
              src="/Images/Unit_Number/Answer_Card/Answer_0.png"
              width="50%"
            ></img>
          </a>
        );
    }
  };
  render() {
    return (
      <div
        className="game-number-row"
        id="game-number-row-question"
        style={{ textAlign: "center" }}
      >
        {this.displayElement()}
      </div>
    );
  }
}

export default QuestionNumber;

import React, {Component} from "react";
import {withRouter} from "react-router";

import {Redirect} from 'react-router';

class AnswerNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrNext: [
                "zero",
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
                "nine",
            ],
            url: "",
            ids: ["answer-one", "answer-two", "answer-three", "answer-four"]
        };
    }


    toSpeak = (message) => {
        var speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
        speechSynthesisUtterance.lang = "en-UK";
        window.speechSynthesis.speak(speechSynthesisUtterance);
    };

    nextAns = (id) => {
        const e = document.getElementById(id);
        if (e) {
            if (e.style.cursor === "pointer") {
                this.toSpeak("Yes");
                for (let i = 0; i < this.state.ids.length; i++) {
                    const e = document.getElementById(this.state.ids[i]);
                    if (e) {
                        e.style.cursor = "not-allowed";
                    }
                }
                this.props.showAnswer();
                let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                Promise.resolve(3000)
                    .then(() => wait(3000))
                    .then(() => {
                        for (let i = 0; i < this.state.ids.length; i++) {
                            const e = document.getElementById(this.state.ids[i]);
                            if (e) {
                                e.style.cursor = "pointer";
                            }
                        }
                        this.props.redirectAnswer();
                    });
            }
        }

    };

    displayElement = () => {
        switch (this.props.answer.ans) {
            case 1:
                return (
                    <>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans1}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.nextAns("answer-one");
                                    }}
                                    id="answer-one"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans2}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-two");
                                    }}
                                    id="answer-two"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans3}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-three")
                                    }}
                                    id="answer-three"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans4}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-four")
                                    }}
                                    id="answer-four"
                                />
                            </a>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans1}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-one")
                                    }}
                                    id="answer-one"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans2}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.nextAns("answer-two");
                                    }}
                                    id="answer-two"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans3}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-three")
                                    }}
                                    id="answer-three"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans4}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-four")
                                    }}
                                    id="answer-four"
                                />
                            </a>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans1}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-one")
                                    }}
                                    id="answer-one"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans2}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-two")
                                    }}
                                    id="answer-two"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans3}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.nextAns("answer-three");
                                    }}
                                    id="answer-three"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans4}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-four")
                                    }}
                                    id="answer-four"
                                />
                            </a>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans1}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-one")
                                    }}
                                    id="answer-one"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans2}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-two")
                                    }}
                                    id="answer-two"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans3}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.props.redirectNoAnswer("answer-three")
                                    }}
                                    id="answer-three"
                                />
                            </a>
                        </div>
                        <div className="col-sm-3">
                            <a className="zoom">
                                <img
                                    src={this.props.answer.ans4}
                                    width="70%"
                                    style={{marginLeft: "35px"}}
                                    onClick={() => {
                                        
                                        this.nextAns("answer-four");
                                    }}
                                    id="answer-four"
                                />
                            </a>
                        </div>
                    </>
                );
        }
    };
    correctAnswer = () => {
        this.props.correctAnswer();
    };

    render() {
        // const { redirect } = this.state;
        //
        // if (redirect) {
        //     return <Redirect to={this.state.url}/>
        // }
        return (
            <div className="game-number-row row" id="game-number-row-answer">
                {this.displayElement()}
            </div>
        );
    }
}

export default AnswerNumber;



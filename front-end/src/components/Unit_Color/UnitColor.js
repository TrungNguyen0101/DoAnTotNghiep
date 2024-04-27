import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Auth from "../service/Auth";

class UnitColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "/Images/Unit Color/Game_Card/Pig/NoColor_Pig.png",
      colors: [
        "Green",
        "Orange",
        "Red",
        "Pink",
        "Purple",
        "Yellow",
        "Blue",
        "Black",
        "Brown",
        "White",
      ],
      ids: [
        "Green",
        "Orange",
        "Red",
        "Pink",
        "Purple",
        "Yellow",
        "Blue",
        "Black",
        "Brown",
        "White",
      ],
      color: "",
      urls: [
        {
          code: "Green",
          name: "Images/Unit Color/Game_Card/Pig/Green_Pig.png",
        },
        {
          code: "Orange",
          name: "Images/Unit Color/Game_Card/Pig/Orange_Pig.png",
        },
        { code: "Red", name: "Images/Unit Color/Game_Card/Pig/Red_Pig.png" },
        { code: "Pink", name: "Images/Unit Color/Game_Card/Pig/Pink_Pig.png" },
        {
          code: "Purple",
          name: "Images/Unit Color/Game_Card/Pig/Purple_Pig.png",
        },
        {
          code: "Yellow",
          name: "Images/Unit Color/Game_Card/Pig/Yellow_Pig.png",
        },
        { code: "Blue", name: "Images/Unit Color/Game_Card/Pig/Blue_Pig.png" },
        {
          code: "Black",
          name: "Images/Unit Color/Game_Card/Pig/Black_Pig.png",
        },
        {
          code: "Brown",
          name: "Images/Unit Color/Game_Card/Pig/Brown_Pig.png",
        },
        {
          code: "White",
          name: "Images/Unit Color/Game_Card/Pig/White_Pig.png",
        },
      ],
      isCorrectAnswer: false,
      isWin: false,
      score: 0,
      countdown: null,
      start: false,
      isHidden: true,
      minutes: 0,
      seconds: "00",
      number: "",
      gameOver: false,
      currentUser: Auth.getCurrentUser(),
    };
  }

  toSpeak = (message) => {
    var speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
    speechSynthesisUtterance.lang = "en-UK";
    window.speechSynthesis.speak(speechSynthesisUtterance);
  };

  random = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  playAudio = (color) => {
    console.log(this.state.colors.length, this.state.urls);
    if (this.state.colors.length !== 0) {
      const e = document.getElementById(color);
      if (e) {
        if (e.style.cursor === "pointer") {
          if (this.state.color === color) {
            this.toSpeak("Yes");
            this.setState({
              score: this.state.score + 10,
              isCorrectAnswer: false,
            });
            let url = this.state.urls.find((item) => item.code === color);
            if (url) {
              this.setState({ url: url.name });
            }

            let urls = this.state.urls.filter((item) => item.code !== color);
            this.setState({ urls });

            for (let i = 0; i < this.state.ids.length; i++) {
              const e = document.getElementById(this.state.ids[i]);
              if (e) {
                e.style.cursor = "not-allowed";
              }
            }
            const wait = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            Promise.resolve(3000)
              .then(() => wait(3000))
              .then(() => {
                let color = this.random(this.state.colors, 1)[0];
                let colors = this.state.colors.filter((i) => i !== color);
                this.setState({
                  colors,
                  color,
                  url: "/Images/Unit Color/Game_Card/Pig/NoColor_Pig.png",
                });
                this.toSpeak(color);
                for (let i = 0; i < this.state.ids.length; i++) {
                  const e = document.getElementById(this.state.ids[i]);
                  if (e) {
                    e.style.cursor = "pointer";
                  }
                }
              });
          } else {
            this.toSpeak("No");
            this.setState({ color: "No" });
            let urls = this.state.urls.filter((item) => item.code !== color);
            this.setState({ urls });

            for (let i = 0; i < this.state.ids.length; i++) {
              const e = document.getElementById(this.state.ids[i]);
              if (e) {
                e.style.cursor = "not-allowed";
              }
            }
            const wait = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            Promise.resolve(3000)
              .then(() => wait(3000))
              .then(() => {
                let color = this.random(this.state.colors, 1)[0];
                let colors = this.state.colors.filter((i) => i !== color);
                this.setState({
                  colors,
                  color,
                  url: "/Images/Unit Color/Game_Card/Pig/NoColor_Pig.png",
                });
                this.toSpeak(color);
                for (let i = 0; i < this.state.ids.length; i++) {
                  const e = document.getElementById(this.state.ids[i]);
                  if (e) {
                    e.style.cursor = "pointer";
                  }
                }
              });
          }
        }
      }
    } else {
      this.toSpeak("Yes");
      let url = this.state.urls.find((item) => item.code === color);
      if (url) {
        this.setState({ url: url.name });
      }
      this.setState({ score: this.state.score + 10 });
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      Promise.resolve(3000)
        .then(() => wait(3000))
        .then(() => {
          this.setState({ isWin: true });
        });
      this.apiScore(this.state.score + 10);
      clearInterval(this.state.countdown);
    }
  };

  componentDidMount() {
    sessionStorage.setItem("colors", JSON.stringify(this.state.colors));
    sessionStorage.setItem("urls", JSON.stringify(this.state.urls));
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", this.onBackButtonEvent);
  }

  onBackButtonEvent = (e) => {
    e.preventDefault();
    // this.gameOver();
    this.props.history.push("/home-page");
    window.location.reload();
  };

  countdown = () => {
    this.setState({ start: true });
    if (this.state.colors.length === 0) {
      const colors = JSON.parse(sessionStorage.getItem("colors"));
      const urls = JSON.parse(sessionStorage.getItem("urls"));
      if (colors) {
        this.setState({ colors });
      }
      if (urls) {
        this.setState({ urls });
      }
      if (document.getElementsByClassName("demo")) {
        document.getElementsByClassName("demo")[0].style.display = "block";
      }
      if (document.getElementById("countdown")) {
        document.getElementById("countdown").classList.add("overlay-text");
        document.getElementById("countdown").classList.add("visible");
      }
      this.setState({ isWin: false });
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      Promise.resolve(3600)
        .then(() => wait(3600))
        .then(() => {
          this.setState({
            isHidden: false,
            isCorrectAnswer: false,
            url: "/Images/Unit Color/Game_Card/Pig/NoColor_Pig.png",
          });
          if (document.getElementById("countdown")) {
            document
              .getElementById("countdown")
              .classList.remove("overlay-text");
            document.getElementById("countdown").classList.remove("visible");
          }
          if (document.getElementsByClassName("demo")) {
            document.getElementsByClassName("demo")[0].style.display = "none";
          }

          let color = this.random(this.state.colors, 1)[0];
          let colors = this.state.colors.filter((i) => i !== color);
          this.setState({ color, colors });
          this.toSpeak(color);
          for (let i = 0; i < this.state.ids.length; i++) {
            const e = document.getElementById(this.state.ids[i]);
            if (e) {
              e.style.cursor = "pointer";
            }
          }
          this.init();
        });
      return;
    }
    let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    Promise.resolve(3600)
      .then(() => wait(3600))
      .then(() => {
        this.setState({ isHidden: false });
        let color = this.random(this.state.colors, 1)[0];
        let colors = this.state.colors.filter((i) => i !== color);
        this.setState({ color, colors });
        this.toSpeak(color);
        for (let i = 0; i < this.state.ids.length; i++) {
          const e = document.getElementById(this.state.ids[i]);
          if (e) {
            e.style.cursor = "pointer";
          }
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.remove("overlay-text");
          document.getElementById("countdown").classList.remove("visible");
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "none";
        }
        this.init();
      });
  };

  gameOver = () => {
    this.setState({ gameOver: true });
    clearInterval(this.state.countdown);
  };

  init = () => {
    this.setState({ score: 0 });
    let minutes = 2;
    this.startTimer(minutes);
  };

  startTimer = (duration) => {
    let timer = 60 * duration,
      minutes,
      seconds;
    const countdown = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.setState({ minutes, seconds });
      if (--timer < 0) {
        this.gameOver();
      }
    }, 1000);
    this.setState({ countdown });
  };

  gameOverCountdown = () => {
    this.setState({ start: true, gameOver: false });
    const colors = JSON.parse(sessionStorage.getItem("colors"));
    const urls = JSON.parse(sessionStorage.getItem("urls"));
    if (colors) {
      this.setState({ colors });
    }
    if (urls) {
      this.setState({ urls });
    }
    if (document.getElementsByClassName("demo")) {
      document.getElementsByClassName("demo")[0].style.display = "block";
    }
    if (document.getElementById("countdown")) {
      document.getElementById("countdown").classList.add("overlay-text");
      document.getElementById("countdown").classList.add("visible");
    }
    let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    Promise.resolve(3600)
      .then(() => wait(3600))
      .then(() => {
        this.setState({
          isHidden: false,
          url: "/Images/Unit Color/Game_Card/Pig/NoColor_Pig.png",
        });
        let color = this.random(this.state.colors, 1)[0];
        let colors = this.state.colors.filter((i) => i !== color);
        this.setState({ color, colors });
        this.toSpeak(color);
        for (let i = 0; i < this.state.ids.length; i++) {
          const e = document.getElementById(this.state.ids[i]);
          if (e) {
            e.style.cursor = "pointer";
          }
        }
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.remove("overlay-text");
          document.getElementById("countdown").classList.remove("visible");
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "none";
        }
        this.init();
      });
  };

  apiScore = (score) => {
    (async () => {
      try {
        if (this.state.currentUser) {
          const { id, accessToken } = this.state.currentUser;
          const res = await axios.put(
            `http://localhost:3030/api/user/score/${id}`,
            {
              name: "color",
              score: score,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const { data } = res;
          if (data) {
            if (data.exp && data.score) {
              this.state.currentUser.exp = data.exp;
              this.state.currentUser.listScore =
                this.state.currentUser.listScore.map((e) => {
                  if (e.name === "UNIT_COLOR") {
                    if (e.score < data.score) {
                      e.score = data.score;
                    }
                    return e;
                  }
                  return e;
                });

              console.log(this.state.currentUser.listScore);

              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...this.state.currentUser,
                })
              );
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  backHome = () => {
    this.props.history.push("/home-page");
    window.location.reload();
  };

  render() {
    return (
      <div className="container unit-aphabet">
        {this.state.isWin && (
          <div id="js-panel" className="panel" style={{ display: "block" }}>
            <div className="panel__content">
              <h4 id="notify" style={{ color: "#28a745" }}>
                Chúc mừng
              </h4>
              <h2>
                Bạn đạt <span id="score-game">{this.state.score}</span> điểm
              </h2>
              {this.state.currentUser ? (
                <p id="description">Bạn được nhận thêm điểm kinh nghiệm</p>
              ) : (
                <p id="description">Hãy đăng ký để lưu điểm của bạn</p>
              )}
            </div>
            <div className="panel__flaps">
              <div className="flap outer flap--left" />
              <Link
                className="flap flap__btn"
                id="play-again"
                onClick={() => this.countdown()}
              >
                Chơi lại
              </Link>
              <Link to="/home-page" className="flap flap__btn" id="exit">
                Thoát
              </Link>
              <div className="flap outer flap--right" />
            </div>
          </div>
        )}

        {this.state.gameOver && (
          <div id="js-panel" className="panel" style={{ display: "block" }}>
            <div className="panel__content">
              <h4 id="notify" style={{ color: "#dc3545" }}>
                Hết giờ
              </h4>
              <h2>
                Bạn đạt <span id="score-game">{this.state.score}</span> điểm
              </h2>
              <p id="description"></p>
            </div>
            <div className="panel__flaps">
              <div className="flap outer flap--left" />
              <Link
                className="flap flap__btn"
                id="play-again"
                onClick={() => this.gameOverCountdown()}
              >
                Chơi lại
              </Link>
              <Link to="/home-page" className="flap flap__btn" id="exit">
                Thoát
              </Link>
              <div className="flap outer flap--right" />
            </div>
          </div>
        )}

        {!this.state.start && (
          <div id="js-panel" className="panel" style={{ display: "block" }}>
            <div className="panel__content">
              <h4>Hướng dẫn</h4>
              <p style={{ fontSize: "1.5em" }}>
                Bạn hãy nghe và chọn màu đúng với yêu cầu để tô màu cho con vật.
              </p>
            </div>
            <div className="panel__flaps">
              <div className="flap outer flap--left" />
              <Link
                className="flap flap__btn"
                id="play-again"
                onClick={() => this.countdown()}
              >
                Bắt đầu
              </Link>
              <Link to="/home-page" className="flap flap__btn" id="exit">
                Thoát
              </Link>
              <div className="flap outer flap--right" />
            </div>
          </div>
        )}

        {this.state.start && (
          <div className="overlay-text visible" id="countdown">
            <div className="demo">
              <div className="demo__colored-blocks">
                <div className="demo__colored-blocks-rotater">
                  <div className="demo__colored-block" />
                  <div className="demo__colored-block" />
                  <div className="demo__colored-block" />
                </div>
                <div className="demo__colored-blocks-inner" />
                <div className="demo__text">Ready</div>
              </div>
              <div className="demo__inner">
                <svg className="demo__numbers" viewBox="0 0 100 100">
                  <defs>
                    <path className="demo__num-path-1" d="M40,28 55,22 55,78" />
                    <path
                      className="demo__num-join-1-2"
                      d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"
                    />
                    <path
                      className="demo__num-path-2"
                      d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"
                    />
                    <path
                      className="demo__num-join-2-3"
                      d="M28,69 Q25,44 34.4,27.4"
                    />
                    <path
                      className="demo__num-path-3"
                      d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"
                    />
                  </defs>
                  <path
                    className="demo__numbers-path"
                    d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19
                Q25,44 34.4,27.4
                l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73
                a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83
                l0,-61 L40,28"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div
          className="row center"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="col-sm-1">
            {/* <Link to="/home-page"> */}
            <img
              src="/Images/LoginPage/Back_Button.png"
              alt=""
              style={{ width: "200%", marginLeft: "-190px" }}
              onClick={() => this.backHome()}
            />
            {/* </Link> */}
          </div>
          <div className="col-md-3 img-cat">
            <img
              src="/Images/Avatar/Cat/Cat_talk.png"
              alt=""
              id="img-cat"
              className="img-thumbnail"
            />
          </div>
          <div className="col-md-7">
            <div className="time-bar row" id="gameInfoBlock">
              <div className="time col-md-8">
                <span id="Timer">
                  Thời gian {this.state.minutes}:{this.state.seconds}
                </span>
              </div>
              <div className="score col-md-3">
                <span style={{ fontSize: "22px" }}>
                  Điểm: {this.state.score}
                </span>
              </div>
              <div className="col-md-1" />
            </div>
          </div>
        </div>
        {!this.state.isWin && (
          <div className="row center background-color-white game-aphabet mt-4">
            <div className="col-sm-8">
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Red_Pen.png"
                  alt=""
                  style={{ cursor: "pointer" }}
                  id="Red"
                  width="100px"
                  he
                  ight="150px"
                  onClick={() => this.playAudio("Red")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Yellow_Pen.png"
                  alt=""
                  width="100px"
                  id="Yellow"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Yellow")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Brown_Pen.png"
                  alt=""
                  width="100px"
                  id="Brown"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Brown")}
                />
              </a>
              <br />
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Green_Pen.png"
                  alt=""
                  width="100px"
                  id="Green"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  onClick={() => this.playAudio("Green")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Pink_Pen.png"
                  alt=""
                  width="100px"
                  id="Pink"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Pink")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/White_Pen.png"
                  alt=""
                  id="White"
                  width="100px"
                  height="150px"
                  style={{ cursor: "pointer" }}
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("White")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Orange_Pen.png"
                  alt=""
                  width="100px"
                  id="Orange"
                  height="150px"
                  style={{ cursor: "pointer" }}
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Orange")}
                />
              </a>
              <br />
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Blue_Pen.png"
                  alt=""
                  width="100px"
                  id="Blue"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  onClick={() => this.playAudio("Blue")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Purple_Pen.png"
                  alt=""
                  width="100px"
                  id="Purple"
                  style={{ cursor: "pointer" }}
                  height="150px"
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Purple")}
                />
              </a>
              <a className="zoom">
                <img
                  src="/Images/Unit Color/Game_Card/Pen/Black_Pen.png"
                  alt=""
                  width="100px"
                  id="Black"
                  height="150px"
                  style={{ cursor: "pointer" }}
                  style={{ marginLeft: "50px" }}
                  onClick={() => this.playAudio("Black")}
                />
              </a>
            </div>
            <div
              className="col-sm-4 game-number-row"
              id="game-number-row-question"
              style={{ marginLeft: "-100px", textAlign: "center" }}
            >
              <a>
                <img
                  src={this.state.url}
                  width="100%"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.toSpeak(this.state.color)}
                ></img>
              </a>
              <h2 style={{ fontSize: "80px" }}>{this.state.color}</h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UnitColor;

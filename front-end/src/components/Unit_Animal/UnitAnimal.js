import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../service/Auth";
import AnimalItem from "./AnimalItem";
import axios from "axios";
import { withRouter } from "react-router";

class UnitAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWin: false,
      score: 0,
      countdown: null,
      start: false,
      isHidden: true,
      minutes: 0,
      seconds: "00",
      number: "",
      lessonOver: false,
      currentUser: Auth.getCurrentUser(),
      animals: [
        "Cat",
        "Crab",
        "Dog",
        "Dolphin",
        "Duck",
        "Lion",
        "Monkey",
        "Penguin",
        "Pig",
        "Sheep",
      ],
      animal: "",
      urls: [
        {
          code: "Cat",
          name: "Images/Unit Animal/lesson_Card/G_Cat.png",
        },
        {
          code: "Crab",
          name: "Images/Unit Animal/lesson_Card/G_Crab.png",
        },
        {
          code: "Dog",
          name: "Images/Unit Animal/lesson_Card/G_Dog.png",
        },
        {
          code: "Dolphin",
          name: "Images/Unit Animal/lesson_Card/G_Dolphin.png",
        },
        {
          code: "Duck",
          name: "Images/Unit Animal/lesson_Card/G_Duck.png",
        },
        {
          code: "Lion",
          name: "Images/Unit Animal/lesson_Card/G_Lion.png",
        },
        {
          code: "Monkey",
          name: "Images/Unit Animal/lesson_Card/G_Monkey.png",
        },
        {
          code: "Penguin",
          name: "Images/Unit Animal/lesson_Card/G_Penguin.png",
        },
        {
          code: "Pig",
          name: "Images/Unit Animal/lesson_Card/G_Pig.png",
        },
        {
          code: "Sheep",
          name: "Images/Unit Animal/lesson_Card/G_Sheep.png",
        },
      ],
      data: [],
      ok: "Images/Unit Animal/lesson_Card/G_Ok.png",
      countData: [],
    };
  }

  componentDidMount() {
    sessionStorage.setItem("urls", JSON.stringify(this.state.urls));
    sessionStorage.setItem("animals", JSON.stringify(this.state.animals));

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", this.onBackButtonEvent);
  }

  onBackButtonEvent = (e) => {
    e.preventDefault();
    // this.lessonOver();
    window.location.reload();
    this.props.history.push("/home-page");
  };

  countdown = () => {
    this.setState({ start: true });
    if (this.state.animals.length === 0) {
      const urls = JSON.parse(sessionStorage.getItem("urls"));
      const animals = JSON.parse(sessionStorage.getItem("animals"));
      if (urls) {
        this.setState({ urls });
      }
      if (animals) {
        this.setState({ animals });
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
          this.setState({ isHidden: false, isCorrectAnswer: false });
          if (document.getElementById("countdown")) {
            document
              .getElementById("countdown")
              .classList.remove("overlay-text");
            document.getElementById("countdown").classList.remove("visible");
          }
          if (document.getElementsByClassName("demo")) {
            document.getElementsByClassName("demo")[0].style.display = "none";
          }
          this.setState({ score: 0 });
          this.createData();
        });
      return;
    }
    let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    Promise.resolve(3600)
      .then(() => wait(3600))
      .then(() => {
        if (document.getElementById("countdown")) {
          document.getElementById("countdown").classList.remove("overlay-text");
          document.getElementById("countdown").classList.remove("visible");
        }
        if (document.getElementsByClassName("demo")) {
          document.getElementsByClassName("demo")[0].style.display = "none";
        }
        this.setState({ isHidden: false });
        this.setState({ score: 0 });
        this.createData();
      });
  };

  lessonOver = () => {
    this.setState({ lessonOver: true });
    clearInterval(this.state.countdown);
  };

  next = () => {
    clearInterval(this.state.countdown);
  };

  init = () => {
    this.next();
    let minutes = 1 / 6;
    this.startTimer(minutes);
  };

  createData = () => {
    if (this.state.animals.length === 0) {
      let wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      Promise.resolve(3000)
        .then(() => wait(3000))
        .then(() => {
          this.setState({ isWin: true });
          this.apiScore();
          clearInterval(this.state.countdown);
        });
    } else {
      let animal = this.random(this.state.animals, 1)[0];
      this.toSpeak(animal);
      let animals = this.state.animals.filter((e) => e !== animal);
      this.setState({ animal, animals });
      while (true) {
        const data = [
          ...this.random(this.state.urls, 7),
          ...this.random(this.state.urls, 7),
          ...this.random(this.state.urls, 7),
          ...this.random(this.state.urls, 7),
        ];
        const aCount = new Map(
          [...new Set(data)].map((x) => [x, data.filter((y) => y === x).length])
        );
        const countData = this.state.urls.map((b) => ({
          code: b.code,
          count: aCount.get(b),
        }));
        const k = countData.find((e) => e.count === 0);
        if (!k) {
          this.init();
          this.setState({ countData, data: this.random(data, 28) });
          for (let i = 0; i < this.state.data.length; i++) {
            if (document.getElementById(this.state.data[i].code + "-" + i)) {
              document.getElementById(this.state.data[i].code + "-" + i).src =
                this.state.data[i].name;
            }
          }
          break;
        }
      }
      for (let i = 0; i < this.state.data.length; i++) {
        const e = document.getElementById(this.state.data[i].code + "-" + i);
        if (e) {
          e.style.cursor = "pointer";
        }
      }
    }
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
        this.next();
        this.createData();
      }
    }, 1000);
    this.setState({ countdown });
  };

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

  selectAnimal = (animal, id) => {
    const e = document.getElementById(id);
    console.log(e.style.cursor);
    if (e) {
      if (e.style.cursor === "pointer") {
        if (this.state.animal === animal) {
          this.setState({ score: this.state.score + 10 });
          this.toSpeak("Yes");
          if (document.getElementById(id)) {
            document.getElementById(id).src = this.state.ok;
            document.getElementById(id).style.cursor = "not-allowed";
          }

          const countData = this.state.countData.map((e) => {
            if (e.code === animal) {
              --e.count;
              return e;
            }
            return e;
          });
          const x = countData.find((e) => e.code === animal);
          if (x.count !== 0) {
            this.setState({ countData });
          } else {
            const wait = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));
            Promise.resolve(3000)
              .then(() => wait(3000))
              .then(() => {
                this.createData();
              });
          }
        } else {
          this.toSpeak("No");
          if (this.state.score > 0) {
            this.setState({ score: this.state.score - 10 });
          } else {
            this.setState({ score: 0 });
          }
        }
      }
    }
  };

  apiScore = () => {
    (async () => {
      try {
        if (this.state.currentUser) {
          const { id, accessToken } = this.state.currentUser;
          const res = await axios.put(
            `http://localhost:3030/api/user/score/${id}`,
            {
              name: "animal",
              score: this.state.score,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const { data } = res;
          if (data) {
            console.log(data);
            if (data.exp && data.score) {
              this.state.currentUser.exp = data.exp;
              this.state.currentUser.listScore =
                this.state.currentUser.listScore.map((e) => {
                  if (e.name === "UNIT_ANIMAL") {
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
        {/**/}
        {this.state.isWin && (
          <div id="js-panel" className="panel" style={{ display: "block" }}>
            <div className="panel__content">
              <h4 id="notify" style={{ color: "#28a745" }}>
                Chúc mừng
              </h4>
              <h2>
                Bạn đạt <span id="score-lesson">{this.state.score}</span> điểm
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

        {!this.state.start && (
          <div id="js-panel" className="panel" style={{ display: "block" }}>
            <div className="panel__content">
              <h4>Hướng dẫn</h4>
              <p style={{ fontSize: "1.5em" }}>
                Bạn hãy nghe và chọn tất cả con vật theo yêu cầu.
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

        {/**/}
        <div
          className="row center"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="col-sm-1">
            <img
              src="/Images/LoginPage/Back_Button.png"
              alt=""
              style={{ width: "200%", marginLeft: "-190px" }}
              onClick={() => this.backHome()}
            />
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
            <div className="time-bar row" id="lessonInfoBlock">
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
        <div className="row center background-color-white lesson-aphabet mt-4">
          {!this.state.isWin && (
            <>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "-26%",
                  position: "absolute",
                }}
              >
                <a onClick={() => this.toSpeak(this.state.animal)}>
                  <h2 style={{ fontSize: "60px" }}>{this.state.animal}</h2>
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "70px",
                }}
              >
                {this.state.data.map((item, index) => (
                  <AnimalItem
                    key={index}
                    index={index}
                    name={item.name}
                    id={item.code}
                    selectAnimal={(animal, id) => this.selectAnimal(animal, id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(UnitAnimal);

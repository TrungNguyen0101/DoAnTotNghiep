import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../service/Auth";

var title1 = "/Images/Avatar/Cat/Cat_normal_noborder_1.png";
var title2 = "/Images/Avatar/Cat/Cat_read_noborder.png";
var N0 = "/Images/Unit Animal/Character/C_Cat.png";
var N1 = "/Images/Unit Animal/Character/C_Crab.png";
var N2 = "/Images/Unit Animal/Character/C_Dog.png";
var N3 = "/Images/Unit Animal/Character/C_Dolphin.png";
var N4 = "/Images/Unit Animal/Character/C_Duck.png";
var N5 = "/Images/Unit Animal/Character/C_Lion.png";
var N6 = "/Images/Unit Animal/Character/C_Monkey.png";
var N7 = "/Images/Unit Animal/Character/C_Penguin.png";
var N8 = "/Images/Unit Animal/Character/C_Pig.png";
var N9 = "/Images/Unit Animal/Character/C_Sheep.png";
class Learn_animal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      images: [
        { key: "cat", title: title2, image: N0, code: "0" },
        { key: "crab", title: title2, image: N1, code: "1" },
        { key: "dog", title: title2, image: N2, code: "2" },
        { key: "dolphin", title: title2, image: N3, code: "3" },
        { key: "duck", title: title2, image: N4, code: "4" },
        { key: "lion", title: title2, image: N5, code: "5" },
        { key: "monkey", title: title2, image: N6, code: "6" },
        { key: "penguin", title: title2, image: N7, code: "7" },
        { key: "pig", title: title2, image: N8, code: "8" },
        { key: "sheep", title: title2, image: N9, code: "9" },
      ],
      title: title1,
      image: "",
      code: "",
      isChanged: false,
      currentUser: Auth.getCurrentUser(),
    };
  }

  toSpeak = (message) => {
    var speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
    speechSynthesisUtterance.lang = "en-UK";
    window.speechSynthesis.speak(speechSynthesisUtterance);
  };

  onChangeImg = (code) => {
    const { images } = this.state;
    const img = images.find((img) => img.code === code);
    if (img) {
      this.setState({ title: img.title });
      this.setState({ image: img.image });
      this.setState({ code: img.key });
      this.toSpeak(img.key);
      this.setState({ isChanged: true });
    }
  };
  onChangeImgNoBorder = () => {
    const { currentUser } = this.state;
    if (currentUser) {
      if (!this.state.isChanged) {
        if (currentUser.avatar === "AVATAR_CAT") {
          return "Images/Avatar/Cat/Cat_normal_noborder_1.png";
        }
        if (currentUser.avatar === "AVATAR_DINOSAUR") {
          return "Images/Avatar/Dinosaur/Dinosaur_normal_noborder.png";
        }
        return "Images/Avatar/Dolphin/Dolphin_normal_noborder.png";
      } else {
        if (currentUser.avatar === "AVATAR_CAT") {
          return "Images/Avatar/Cat/Cat_read_noborder.png";
        }
        if (currentUser.avatar === "AVATAR_DINOSAUR") {
          return "Images/Avatar/Dinosaur/Dinosaur_read_noborder.png";
        }
        return "Images/Avatar/Dolphin/Dolphin_read_noborder.png";
      }
    } else {
      if (!this.state.isChanged) {
        return "Images/Avatar/Cat/Cat_normal_noborder_1.png";
      } else {
        return "Images/Avatar/Cat/Cat_read_noborder.png";
      }
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "20px", display: "flex", position: "relative"}}>
          <div>
            <Link to="/home-page">
              <img
                src="/Images/LoginPage/Back_Button.png"
                alt=""
                style={{ width: "10%", position: "absolute" }}
              />
            </Link>
          </div>
          <div>
            <div
              className="menu"
              style={{
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "12px",
                marginLeft: "9%",
                  position: "absolute",
              }}
            >
              <Link to="#1" onClick={() => this.onChangeImg("0")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Cat.png"
                  alt=""
                  width="180px"
                  height="180px"
                />
              </Link>
              <Link to="#2" onClick={() => this.onChangeImg("1")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Crab.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#3" onClick={() => this.onChangeImg("2")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Dog.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#4" onClick={() => this.onChangeImg("3")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Dolphin.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#5" onClick={() => this.onChangeImg("4")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Duck.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <br />
              <Link to="#6" onClick={() => this.onChangeImg("5")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Lion.png"
                  alt=""
                  width="150px"
                  height="180px"
                />
              </Link>
              <Link to="#7" onClick={() => this.onChangeImg("6")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Monkey.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#8" onClick={() => this.onChangeImg("7")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Penguin.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#9" onClick={() => this.onChangeImg("8")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Pig.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
              <Link to="#0" onClick={() => this.onChangeImg("9")}>
                <img
                  src="/Images/Unit Animal/Learn_Card/Sheep.png"
                  alt=""
                  width="150px"
                  height="180px"
                  style={{ marginLeft: "40px" }}
                />
              </Link>
            </div>
          </div>
        </div>
        <div style={{marginTop: "35%", marginLeft: "-11%"}}>
          <div
            className="detailNumber"
            onClick={() => this.toSpeak(this.state.code)}
          >
            <img src={this.onChangeImgNoBorder()} style={{ width: "45%" }} />
            <img src={this.state.image} style={{ width: "55%" }}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn_animal;

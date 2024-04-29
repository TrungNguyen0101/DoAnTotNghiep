import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../service/Auth";

var title1 = "/Images/Avatar/Cat/Cat_normal_noborder_1.png";
var title2 = "/Images/Avatar/Cat/Cat_read_noborder.png";
var Aa = "/Images/Unit_Aphabet/Characters/Aa.png";
var Bb = "/Images/Unit_Aphabet/Characters/Bb.png";
var Cc = "/Images/Unit_Aphabet/Characters/Cc.png";
var Dd = "/Images/Unit_Aphabet/Characters/Dd.png";
var Ee = "/Images/Unit_Aphabet/Characters/Ee.png";
var Ff = "/Images/Unit_Aphabet/Characters/Ff.png";
var Gg = "/Images/Unit_Aphabet/Characters/Gg.png";
var Hh = "/Images/Unit_Aphabet/Characters/Hh.png";
var Ii = "/Images/Unit_Aphabet/Characters/Ii.png";
var Jj = "/Images/Unit_Aphabet/Characters/Jj.png";
var Kk = "/Images/Unit_Aphabet/Characters/Kk.png";
var Ll = "/Images/Unit_Aphabet/Characters/Ll.png";
var Mm = "/Images/Unit_Aphabet/Characters/Mm.png";
var Nn = "/Images/Unit_Aphabet/Characters/Nn.png";
var Oo = "/Images/Unit_Aphabet/Characters/Oo.png";
var Pp = "/Images/Unit_Aphabet/Characters/Pp.png";
var Qq = "/Images/Unit_Aphabet/Characters/Qq.png";
var Rr = "/Images/Unit_Aphabet/Characters/Rr.png";
var Ss = "/Images/Unit_Aphabet/Characters/Ss.png";
var Tt = "/Images/Unit_Aphabet/Characters/Tt.png";
var Uu = "/Images/Unit_Aphabet/Characters/Uu.png";
var Vv = "/Images/Unit_Aphabet/Characters/Vv.png";
var Ww = "/Images/Unit_Aphabet/Characters/Ww.png";
var Xx = "/Images/Unit_Aphabet/Characters/Xx.png";
var Yy = "/Images/Unit_Aphabet/Characters/Yy.png";
var Zz = "/Images/Unit_Aphabet/Characters/Zz.png";

const LearnAlphabet = () => {
  const [title, setTitle] = useState(
    "/Images/Avatar/Cat/Cat_normal_noborder_1.png"
  );
  const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [currentUser, setCurrentUser] = useState(Auth.getCurrentUser());
  const [isChanged, setIsChanged] = useState(false);

  const images = [
    { key: "1", title: title2, image: Aa, code: "A" },
    { key: "2", title: title2, image: Bb, code: "B" },
    { key: "3", title: title2, image: Cc, code: "C" },
    { key: "4", title: title2, image: Dd, code: "D" },
    { key: "5", title: title2, image: Ee, code: "E" },
    { key: "6", title: title2, image: Ff, code: "F" },
    { key: "7", title: title2, image: Gg, code: "G" },
    { key: "8", title: title2, image: Hh, code: "H" },
    { key: "9", title: title2, image: Ii, code: "I" },
    { key: "10", title: title2, image: Jj, code: "J" },
    { key: "11", title: title2, image: Kk, code: "K" },
    { key: "12", title: title2, image: Ll, code: "L" },
    { key: "13", title: title2, image: Mm, code: "M" },
    { key: "14", title: title2, image: Nn, code: "N" },
    { key: "15", title: title2, image: Oo, code: "O" },
    { key: "16", title: title2, image: Pp, code: "P" },
    { key: "17", title: title2, image: Qq, code: "Q" },
    { key: "18", title: title2, image: Rr, code: "R" },
    { key: "19", title: title2, image: Ss, code: "S" },
    { key: "20", title: title2, image: Tt, code: "T" },
    { key: "21", title: title2, image: Uu, code: "U" },
    { key: "22", title: title2, image: Vv, code: "V" },
    { key: "23", title: title2, image: Ww, code: "W" },
    { key: "24", title: title2, image: Xx, code: "X" },
    { key: "25", title: title2, image: Yy, code: "Y" },
    { key: "26", title: title2, image: Zz, code: "Z" },
  ];

  // const images = [
  //   { key: "1", title: title2, image: Aa, code: "A", message: "あ" },
  //   { key: "2", title: title2, image: Bb, code: "B", message: "い" },
  //   { key: "3", title: title2, image: Cc, code: "C", message: "う" },
  //   { key: "4", title: title2, image: Dd, code: "D", message: "え" },
  //   { key: "5", title: title2, image: Ee, code: "E", message: "お" },
  //   { key: "6", title: title2, image: Ff, code: "F", message: "か" },
  //   { key: "7", title: title2, image: Gg, code: "G", message: "き" },
  //   { key: "8", title: title2, image: Hh, code: "H", message: "く" },
  //   { key: "9", title: title2, image: Ii, code: "I", message: "け" },
  //   { key: "10", title: title2, image: Jj, code: "J", message: "こ" },
  //   { key: "11", title: title2, image: Kk, code: "K", message: "さ" },
  //   { key: "12", title: title2, image: Ll, code: "L", message: "し" },
  //   { key: "13", title: title2, image: Mm, code: "M", message: "す" },
  //   { key: "14", title: title2, image: Nn, code: "N", message: "せ" },
  //   { key: "15", title: title2, image: Oo, code: "O", message: "そ" },
  //   { key: "16", title: title2, image: Pp, code: "P", message: "た" },
  //   { key: "17", title: title2, image: Qq, code: "Q", message: "ち" },
  //   { key: "18", title: title2, image: Rr, code: "R", message: "つ" },
  //   { key: "19", title: title2, image: Ss, code: "S", message: "て" },
  //   { key: "20", title: title2, image: Tt, code: "T", message: "と" },
  //   { key: "21", title: title2, image: Uu, code: "U", message: "な" },
  //   { key: "22", title: title2, image: Vv, code: "V", message: "に" },
  //   { key: "23", title: title2, image: Ww, code: "W", message: "ぬ" },
  //   { key: "24", title: title2, image: Xx, code: "X", message: "ね" },
  //   { key: "25", title: title2, image: Yy, code: "Y", message: "の" },
  //   { key: "26", title: title2, image: Zz, code: "Z", message: "は" },
  //   // Thêm các phần tử tiếp theo tương ứng với các ký tự tiếp theo trong bảng chữ cái tiếng Nhật
  // ];

  const toSpeak = (message) => {
    var speechSynthesisUtterance = new SpeechSynthesisUtterance(message);
    speechSynthesisUtterance.lang = "ja-JP";
    speechSynthesisUtterance.volume = 1;
    window.speechSynthesis.speak(speechSynthesisUtterance);
  };

  const onChangeImg = (code) => {
    const img = images.find((img) => img.code === code);
    if (img) {
      setTitle(img.title);
      setImage(img.image);
      setCode(img.code);
      setIsChanged(true);
    }
  };

  const onChangeImgNoBorder = () => {
    if (currentUser) {
      if (!isChanged) {
        if (currentUser.avatar === "AVATAR_CAT") {
          return "/Images/Avatar/Cat/Cat_normal_noborder_1.png";
        }
        if (currentUser.avatar === "AVATAR_DINOSAUR") {
          return "/Images/Avatar/Dinosaur/Dinosaur_normal_noborder.png";
        }
        return "/Images/Avatar/Dolphin/Dolphin_normal_noborder.png";
      } else {
        if (currentUser.avatar === "AVATAR_CAT") {
          return "/Images/Avatar/Cat/Cat_read_noborder.png";
        }
        if (currentUser.avatar === "AVATAR_DINOSAUR") {
          return "/Images/Avatar/Dinosaur/Dinosaur_read_noborder.png";
        }
        return "/Images/Avatar/Dolphin/Dolphin_read_noborder.png";
      }
    } else {
      if (!isChanged) {
        return "/Images/Avatar/Cat/Cat_normal_noborder_1.png";
      } else {
        return "/Images/Avatar/Cat/Cat_read_noborder.png";
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div
          className="row"
          style={{ marginTop: "20px", display: "flex", position: "relative" }}
        >
          <div>
            <Link to="/home-page">
              <img
                src="/Images/LoginPage/Back_Button.png"
                alt=""
                style={{
                  width: "10%",
                  position: "absolute",
                  marginLeft: "-20%",
                }}
              />
            </Link>
          </div>
          <div
            className="menu"
            style={{
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "12px",
              marginLeft: "-5%",
              position: "absolute",
              width: "110%",
            }}
          >
            {images.map((img) => (
              <Link
                to="#learn-aphabet"
                key={img.key}
                onClick={() => {
                  toSpeak(img.code);
                  onChangeImg(img.code);
                }}
                className="inline-block w-auto"
              >
                <img
                  src={`/Images/Unit_Aphabet/Normal Cards/${img.code}.png`}
                  alt=""
                  width="130px"
                  height="130px"
                />
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "37%" }}>
          <div className="detailAlphabet" onClick={() => toSpeak(code)}>
            <img
              src={onChangeImgNoBorder()}
              style={{ width: "50%" }}
              id="avatar"
            />
            <img src={image} style={{ width: "50%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnAlphabet;

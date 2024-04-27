import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../service/Auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import swal from "sweetalert";

const required = (value) => {
  if (!value) {
    return <span className="notify-validate">Bắt buộc</span>;
  }
};

const LoginMaster = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  const checkBtn = useRef(null);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      Auth.login(username, password).then(
        () => {
          props.history.push("/home-page");
          window.location.reload();
        },
        (error) => {
          setLoading(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (resMessage === "Request failed with status code 401") {
            swal({
              title: "Sai tên đăng nhập hoặc mật khẩu",
              icon: "error",
            });
          }
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Form className="form-login center" onSubmit={handleLogin} ref={form}>
        <div className="form-group row">
          <div className="col-md-6 d-flex align-items-center">
            <label htmlFor="username">
              Tên đăng nhập<span className="req">*</span>
            </label>
          </div>
          <div className="col-md-6 container-box">
            <Input
              type="username"
              name="username"
              className="input box-shadow"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-6 d-flex align-items-center">
            <label htmlFor="password">
              Mật khẩu<span className="req">*</span>
            </label>
          </div>
          <div className="col-md-6 container-box">
            <Input
              type="password"
              name="password"
              className="input box-shadow"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
        </div>
        <div className="form-group">
          <div
            className="button-login zoom center img-login-button center"
            disabled={loading}
            type="submit"
          >
            <input
              type="submit"
              id="submitbtn"
              name=""
              tabIndex="5"
              value="Đăng nhập"
            />
          </div>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <div className="back-button zoom">
        <Link to="/home">
          <img src="Images/LoginPage/Back_Button.png" alt="" />
        </Link>
      </div>
      <div className="signin-button">
        <Link to="/register">
          <img
            src="Images/LoginPage/SignUp_Button.png"
            alt=""
            className="heart"
            style={{ width: "120%" }}
          />
        </Link>
      </div>
    </>
  );
};

export default LoginMaster;

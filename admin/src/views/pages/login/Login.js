import React, { Component } from "react";
import swal from "sweetalert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Auth from "../service/Auth";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <span className="notify-validate">This field is mandatory</span>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    console.log("hihi");

    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      Auth.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push('/dashboard');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (resMessage === "Request failed with status code 401") {
            this.setState({
              loading: false,
            });
            swal({
              title: "Wrong username or password",
              icon: "error",
            });
          }
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (

      <>
        <header className="header">
          <h1>LOG IN</h1>
        </header>
        <div
          id="form"
        >
          <div className="fish" id="fish" />
          <div className="fish" id="fish2" />
          <Form id="waterform"
          className="form-login center"
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c;
          }}>
            <div className="formgroup" id="name-form">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="username">
                  Username<span className="req">*</span>
                </label>
              </div>
              <div className="col-md-6 container-box">
                <Input
                  type="username"
                  name="username"
                  className="input box-shadow"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>
            </div>
            <div className="formgroup" id="email-form">
              <div className="col-md-6 d-flex align-items-center">
                <label htmlFor="password">
                  Password<span className="req">*</span>
                </label>
              </div>
              <div className="col-md-6 container-box">
                <Input
                  type="password"
                  name="password"
                  className="input box-shadow"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>
            </div>
            <div className="form-group">
              <input className="input" style={{marginLeft: '14px'}} type="submit" value="Login" />
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </>
    );
  }
}

export default Login;

import React, {useState, useEffect} from "react";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Auth from "../pages/service/Auth";
import {Doughnut} from "react-chartjs-2";

const User = ({match}) => {
  const history = useHistory();
  const [currentUser] = useState(Auth.getCurrentUser());
  const [userDetails, setuserDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState({exp: "", avatar: ""});
  const [checked, setChecked] = useState(null);


  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setInputValues({...inputValues, [name]: value});
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const res = await axios.get(
          `https://backend-kide.herokuapp.com/api/admin/users/${match.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
        const {data} = res;
        if (data) {
          console.log(data)
          setuserDetails(data);
          setInputValues({
            exp: data.exp,
            avatar: convertAvatar(data.avatar),
          });
          setChecked(
            data.roles[0] === "ROLE_ADMIN" || data.roles[1] === "ROLE_ADMIN"
          );
        }
      } catch (e) {
      }
    }

    fetchMyAPI();
  }, []);


  const convertAvatar = (avatar) => {
    if (avatar === "AVATAR_CAT") return "cat";
    if (avatar === "AVATAR_DINO") return "dino";
    else return "dolphin";
  };

  const convertCheck = (data) => {
    return data[0] === "ROLE_ADMIN" || data[1] === "ROLE_ADMIN" ? true : false;
  };

  const validation = (value) => {
    var number = /^[0-9]*$/;
    if (!number.test(value.exp)) {
      swal({
        title: "EXP is a number",
        icon: "error",
      });
      return false;
    }
    if (value.exp.length === 0) {
      swal({
        title: "EXP is required",
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const convertAvatar2 = (avatar) => {
    if (avatar === "cat") return "AVATAR_CAT";
    if (avatar === "dino") return "AVATAR_DINO";
    else return "AVATAR_DOLPHIN";
  };

  const convertRole = (role) => {
    if (role) return ["ROLE_USER", "ROLE_ADMIN"];
    else return ["ROLE_USER"];
  };

  const submit = async () => {
    console.log(inputValues.exp, inputValues.avatar, checked);
    if (
      !validation({
        exp: inputValues.exp,
      })
    ) {
      return;
    } else {
      swal({
        title: "Save change user?",
        text: "You definitely want to save change this user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willSave) => {
        if (willSave) {
          try {
            const res = await axios.put(
              `https://backend-kide.herokuapp.com/api/user/${match.params.id}`,
              {
                exp: inputValues.exp,
                avatar: inputValues.avatar,
                admin: checked,
              },
              {
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
              }
            );
            const {data} = res;
            if (data) {
              if (data.message === "User data has been changed!") {
                return swal({
                  title: "User data has been changed!",
                  icon: "success",
                }).then(async () => {
                  setuserDetails({
                    ...userDetails,
                    exp: inputValues.exp,
                    avatar: convertAvatar2(inputValues.avatar),
                    roles: convertRole(checked),
                  });
                  document.getElementsByClassName(
                    "modal-backdrop"
                  )[0].style.display = "none";
                  document.getElementById("exampleModal").style.display =
                    "none";
                });
              }
            }
          } catch (e) {
          }
        }
      });
    }
  };

  const deleted = () => {
    console.log(userDetails);
    if (userDetails.roles.length === 2) {
      if (
        userDetails.roles[0] === "ROLE_ADMIN" ||
        userDetails.roles[1] === "ROLE_ADMIN" ||
        userDetails.id === match.params.id
      ) {
        return swal({
          title: "Can not delete user",
          icon: "warning",
        });
      }
    }
    swal({
      title: "Delete user?",
      text: "You definitely want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const res = await axios.delete(
            `https://backend-kide.herokuapp.com/api/user/${match.params.id}`,
            {
              headers: {
                Authorization: `Bearer ${currentUser.accessToken}`,
              },
            }
          );
          const {data} = res;
          if (data) {
            if (data.message === "Account has been deleted!") {
              swal({
                title: "Account has been deleted",
                icon: "success",
              }).then(() => {
                history.push(`/users`);
              });
            }
          }
        } catch (e) {
          swal({
            title: "User name has not special character",
            icon: "error",
          });
        }
      }
    });
  };

  const checkDisable = (inputValues) => {
    if (userDetails) {
      console.log(userDetails.exp != inputValues.exp);
      console.log(userDetails.avatar != convertAvatar2(inputValues.avatar));
      console.log(convertCheck(userDetails.roles) != checked);
      if (
        userDetails.exp != inputValues.exp ||
        userDetails.avatar != convertAvatar2(inputValues.avatar) ||
        convertCheck(userDetails.roles) != checked
      ) {
        return false;
      } else return true;
    }
  };

  const closeMoadl = () => {
    if (checkDisable(inputValues) === false) {
      swal({
        title: "Close modal?",
        text: "You want clode modal?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willClose) => {
        if (willClose) {
          document.getElementsByClassName("modal-backdrop")[0].style.display =
            "none";
          document.getElementById("exampleModal").style.display = "none";
        }
      });
    } else {
      document.getElementsByClassName("modal-backdrop")[0].style.display =
        "none";
      document.getElementById("exampleModal").style.display = "none";
    }
  };
  return (
    <CRow>
      <CCol lg={7}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
            <button
              type="button"
              className="btn btn-primary"
              style={{marginLeft: "200px"}}
              onClick={handleShow}
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@mdo"
            >
              Edit User
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{marginLeft: "23px"}}
              onClick={deleted}
            >
              Delete User
            </button>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <td>
                <tr>Id</tr>
                <tr>User name</tr>
                <tr>EXP</tr>
                <tr>Avatar</tr>
                <tr>Create at</tr>
                <tr>Roles</tr>
                <tr>Unit number</tr>
                <tr>Unit animal</tr>
                <tr>Unit color</tr>
                <tr>Unit alphabet</tr>
              </td>
              <td>
                <tr>{userDetails && userDetails.id}</tr>
                <tr>{userDetails && userDetails.username}</tr>
                <tr>{userDetails && userDetails.exp}</tr>
                <tr>{userDetails && userDetails.avatar}</tr>
                <tr>{userDetails && userDetails.createdAt}</tr>
                <tr>
                  {userDetails && userDetails.roles[0]}{" "}
                  {userDetails && userDetails.roles[1]}{" "}
                </tr>
                <tr>{userDetails && userDetails.listScore[0].score}</tr>
                <tr>{userDetails && userDetails.listScore[1].score}</tr>
                <tr>{userDetails && userDetails.listScore[2].score}</tr>
                <tr>{userDetails && userDetails.listScore[3].score}</tr>
              </td>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xl={5}>

      </CCol>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="close"
                onClick={closeMoadl}
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form-update">
                <div className="form-group" style={{display: "flex"}}>
                  <CCol xl={5}>
                    <label htmlFor="exampleInputEmail1">Username</label>
                  </CCol>
                  <CCol xl={5}>
                    <input
                      disabled="true"
                      type="username"
                      className="form-control inputText"
                      placeholder="Enter user name"
                      value={userDetails && userDetails.username}
                    />
                  </CCol>
                </div>
                <div className="form-group" style={{display: "flex"}}>
                  <CCol xl={5}>
                    <label htmlFor="exp">EXP</label>
                  </CCol>
                  <CCol xl={5}>
                    <input
                      type="input"
                      className="form-control inputText"
                      placeholder="exp"
                      name="exp"
                      onChange={handleOnChange}
                      value={inputValues.exp}
                    />
                  </CCol>
                </div>
                <div className="form-group" style={{display: "flex"}}>
                  <CCol xl={5}>
                    <label htmlFor="passwork">Avatar</label>
                  </CCol>
                  <CCol xl={5}>
                    <select
                      name="avatar"
                      onChange={handleOnChange}
                      class="form-control inputText"
                      defaultValue={inputValues.avatar}
                    >
                      <option value="cat">AVATAR_CAT</option>
                      <option value="dino">AVATAR_DINO</option>
                      <option value="dolphin">AVATAR_DOLPHIN</option>
                    </select>
                  </CCol>
                </div>
                <div
                  className="form-check"
                  style={{display: "flex", marginLeft: "-20px"}}
                >
                  <CCol xl={5}>
                    <label htmlFor="roleAdmin"> Role Admin</label>
                  </CCol>
                  <CCol xl={5}>
                    <input
                      className="myinput large"
                      type="checkbox"
                      name="roleAdmin"
                      onChange={() => setChecked(!checked)}
                      checked={checked}
                    />
                  </CCol>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                onClick={submit}
                className="btn btn-primary"
                disabled={checkDisable(inputValues)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeMoadl}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CRow>
  );
};
export default User;

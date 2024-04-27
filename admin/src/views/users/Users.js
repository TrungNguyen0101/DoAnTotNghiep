import React, {useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import Auth from "../pages/service/Auth";
import CheckButton from "react-validation/build/button";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

const API_GET_USER = "https://backend-kide.herokuapp.com/api/admin/users";

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([1-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [dataUsers, setdataUsers] = useState([]);
  const [currentUser] = useState(Auth.getCurrentUser());


  const validation = (value) => {
    if (value.username.length < 3 || value.username.length > 20) {
      swal({
        title: "User name with 3 -> 20 character",
        icon: "error",
      });
      return false;
    }

    if (value.password.length < 6 || value.password.length > 10) {
      swal({
        title: "Password with 6 -> 10 character",
        icon: "error",
      });
      return false;
    }

    if (value.username.includes(" ")) {
      swal({
        title: "User name has not space",
        icon: "error",
      });
      return false;
    }

    var specials = /[^A-Za-z 0-9]/g;

    if (specials.test(value.username)) {
      swal({
        title: "User name has not special character",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const pageChange = (newPage) => {
    if (newPage === 0) newPage = 1;
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const res = await axios.get(
          API_GET_USER,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          }
        );
        const {data} = res;
        if (data) {
          const arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push({...data[i], index: i + 1});
          }
          setdataUsers([...dataUsers, ...arr]);
        }
      } catch (e) {
      }
    }

    fetchMyAPI();
  }, []);
  // Add user
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  const [checked, setChecked] = useState(null);

  const convertRole = (role) => {
    if (role === true) return ["admin", "user"];
    else return ["user"];
  };

  const convertRolePushDataUsers = (role) => {
    if (role === true) return ["ROLE_ADMIN", "ROLE_USER"];
    return ["ROLE_USER"];
  };

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setInputValues({...inputValues, [name]: value});
  };

  const submit = async (e) => {
    e.preventDefault();
    if (
      !validation({
        username: inputValues.username,
        password: inputValues.password,
      })
    ) {
      return;
    } else {
      swal({
        title: "Add new user?",
        text: "You definitely want to add new this user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willSave) => {
        if (willSave) {
          var dateObj = new Date();
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();
          var newdate = day + "/" + month + "/" + year;
          try {
            const res = await axios.post(
              `https://backend-kide.herokuapp.com/api/signup`,
              {
                username: inputValues.username,
                password: inputValues.password,
                roles: convertRole(checked),
              }
            ); //"Error: Username is already taken!"
            const {data} = res;

            if (data) {
              if (data.message === "User registered successfully!") {
                setdataUsers([
                  ...dataUsers,
                  {
                    index: dataUsers.length + 1,
                    username: inputValues.username,
                    password: inputValues.password,
                    roles: convertRolePushDataUsers(checked),
                    createdAt: newdate,
                  },
                ]);
                swal({
                  title: "User registered successfully!",
                  icon: "success",
                }).then((value) => {
                  setInputValues({
                    username: "",
                    password: "",
                  });
                  setChecked(false);
                  document.getElementsByClassName(
                    "modal-backdrop"
                  )[0].style.display = "none";
                  document.getElementById("exampleModal").style.display =
                    "none";
                });
              }
            }
          } catch (e) {
            return swal({
              title: "Username has been used",
              icon: "warning",
            });
          }
        }
      });
    }
  };
  // end add user
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const checkPage = (result) => {
    if (result % 5 === 0) {
      return parseInt(result / 5);
    } else return parseInt(result / 5 + 1);
  };

  const checkDisable = (inputValues) => {
    if (inputValues.username != "" || inputValues.password != "" || checked) {
      return false;
    } else return true;
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
          setInputValues({
            username: "",
            password: "",
          });
          setChecked(false);
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
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={dataUsers}
              fields={[
                {key: "index", _classes: "font-weight-bold"},
                "username",
                {key: "roles", label: "Role admin"},
                "createdAt",
              ]}
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                roles: (item) => (
                  <td>
                    {
                      <input
                        type="radio"
                        checked={
                          item.roles[0] === "ROLE_ADMIN" ||
                          item.roles[1] === "ROLE_ADMIN"
                        }
                      ></input>
                    }
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={checkPage(dataUsers.length)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xl={2}>
        <button
          type="button"
          className="btn btn-primary"
          style={{marginLeft: "40px"}}
          onClick={() => {
            handleShow();
          }}
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          Add User
        </button>
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
                Add New User
              </h5>
              <button
                type="button"
                className="close"
                //data-dismiss="modal"
                aria-label="Close"
                onClick={closeMoadl}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <Form className="form-add" onSubmit={submit}>
                <div className="form-group" style={{display: "flex"}}>
                  <label htmlFor="exampleInputEmail1">Username</label>
                  <Input
                    type="username"
                    className="form-control inputText"
                    placeholder="Enter user name"
                    onChange={handleOnChange}
                    required
                    name="username"
                    value={inputValues.username}
                  />
                </div>
                <div className="form-group" style={{display: "flex"}}>
                  <label htmlFor="passwork">Password</label>
                  <input
                    type="password"
                    className="form-control inputText"
                    placeholder="Password"
                    onChange={handleOnChange}
                    required
                    name="password"
                    value={inputValues.password}
                  />
                </div>
                <div
                  className="form-check"
                  style={{display: "flex", marginLeft: "-20px"}}
                >
                  <label htmlFor="roleAdmin"> Role Admin</label>
                  <Input
                    type="checkbox"
                    onChange={() => setChecked(!checked)}
                    name="roleAmin"
                    checked={checked}
                    value={checked}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={checkDisable(inputValues)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    //data-dismiss="modal"
                    onClick={closeMoadl}
                  >
                    Close
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </CRow>
  );
};

export default Users;

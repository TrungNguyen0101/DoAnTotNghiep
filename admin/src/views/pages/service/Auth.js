import axios from "axios";

const API_URL = "https://backend-kide.herokuapp.com/api/signin";

class Auth {
  login(username, password) {
    return axios
      .post(API_URL, {
          username,
          password
        },
        {
          headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        }
      )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("jwt", JSON.stringify(response.data.accessToken));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
  }

  register(username, password, role) {
    return axios.post(API_URL + "signup", {
      username,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
    ;
  }
}

export default new Auth();

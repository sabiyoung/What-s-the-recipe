/* start-saba */
import { apiService as api } from "../service/api.service.js";
import { displayUserName } from "./user.service.js";

document.getElementById("login-form")?.addEventListener("submit", userLogin);
function userLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const form = document.getElementById("login-form");
  api
    .post("login", {
      email: email,
      password: password,
    })
    .then((data) => localStorage.setItem("user", JSON.stringify(data)))
    .then(() => displayUserName());
}

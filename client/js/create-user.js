/* start-saba */
import { apiService as api } from "../service/api.service.js";

document.getElementById("myform").addEventListener("submit", createUser);
function createUser(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const username= document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const form = document.getElementById("myform")
  console.log("user hass been register");

  api.post("create-user", {
      name: name,
      username: username,
      email: email,
      password:password
      
    })
    .then((data) => console.log(data));
    form.reset()
}

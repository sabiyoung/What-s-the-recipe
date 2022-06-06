export function displayUserName() {
  const getUser = JSON.parse(window.localStorage.getItem("user"));
  if (getUser) {
    const userName = getUser.user.name;
    const myDiv = document.querySelector(".login-user");
    myDiv.innerHTML = userName;
  }
}
displayUserName();

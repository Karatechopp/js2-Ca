import { getUsername, jwtKey, userKey } from "../utils/storageLogin.js";

let username = getUsername();

export default function logoutButton() {
  const logout = document.querySelector("#logout");

  if (logout) {
    logout.onclick = function () {
      const doLogout = confirm("Logout from " + username + " ?");

      if (doLogout) {
        localStorage.removeItem(userKey);
        localStorage.removeItem(jwtKey);
      }

      if (!localStorage.getItem(userKey) && !localStorage.getItem(jwtKey)) {
        location.href = "/index.html";
      }
    };
  }
}

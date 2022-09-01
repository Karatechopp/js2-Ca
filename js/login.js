import displayMessage from "./components/common/displayMessage.js";
import { createLoginModal } from "./components/createLoginModal.js";
import createNav from "./components/createNav.js";
import { baseUrl } from "./settings/api.js";
import { saveJwt, saveUser } from "./utils/storageLogin.js";

createLoginModal();

const loginModal = document.querySelector(".create-loginmodal");
const submit = document.querySelector(".submit");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

submit.addEventListener("click", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!usernameValue || !passwordValue) {
    return displayMessage("warning", "Fields cannot be empty", ".modal-message");
  }

  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveJwt(json.jwt);
      saveUser(json.user);

      createNav();

      localStorage.setItem("login", "success");

      location.href = "/index.html";
    }

    if (json.error) {
      return displayMessage("error", json.error + " - " + json.message[0].messages[0].message, ".modal-message");
    }
  } catch (error) {
    console.log(error);
  }
}

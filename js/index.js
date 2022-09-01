import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";
import createNav from "./components/createNav.js";
import { createArticleCards } from "./components/createArticleCards.js";
import { searchAuthors } from "./components/filterAuthors.js";
import { createLoginModal } from "./components/createLoginModal.js";
import { getUsername } from "./utils/storageLogin.js";

createNav();
createLoginModal();

const articlePath = "articles";
const username = getUsername();
const login = localStorage.getItem("login");
const deleted = localStorage.getItem("deleted");

(async function () {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  try {
    const response = await fetch(baseUrl + articlePath);
    const json = await response.json();

    createArticleCards(json);
    searchAuthors(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".container");
  }
})();

if (login && username) {
  displayMessage("success", "Successfully logged in " + username + "👌👌", ".message-container");
  setTimeout(clearMessage, 2000);
}
if (deleted && username) {
  displayMessage("success", "Successfully deleted article", ".message-container");
  setTimeout(clearMessage, 2000);
}

function clearMessage() {
  const message = document.querySelector(".message-container");
  message.innerHTML = "";
  localStorage.removeItem("login");
  localStorage.removeItem("deleted");
}

import createNav from "./components/createNav.js";
import { getJwt } from "./utils/storageLogin.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";

const jwt = getJwt();

if (!jwt) {
  location.href = "/index.html";
}

createNav();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();

  console.log(titleValue, authorValue, summaryValue);

  if (titleValue.length === 0 || authorValue.length === 0 || summaryValue.length === 0) {
    return displayMessage("warning", "Fields cannot be empty", ".message-container");
  }

  addArticle(titleValue, authorValue, summaryValue);
}

async function addArticle(title, author, summary) {
  const url = baseUrl + "articles";

  const data = JSON.stringify({ title: title, summary: summary, author: author });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Article has been added", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.error + " " + json.message, ".message-container");
    }
  } catch (error) {
    displayMessage("error", json.message, ".message-container");
  }
}

import createNav from "./components/createNav.js";
import { getJwt } from "./utils/storageLogin.js";
import displayMessage from "./components/common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import deleteIconArticle from "./components/common/deleteArticle.js";

const jwt = getJwt();

if (!jwt) {
  location.href = "/index.html";
}

createNav();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  location.href = "/index.html";
}

const articleUrl = baseUrl + "articles/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");
const message = document.querySelector(".message-container");

(async function () {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    title.value = json.title;
    author.value = json.author;
    summary.value = json.summary;

    deleteIconArticle(json.id);
  } catch (error) {
    displayMessage("error", json.error + " " + json.message, ".message-container");
  }
})();

form.addEventListener("submit", submitEdit);

function submitEdit() {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const summaryValue = summary.value.trim();

  console.log(titleValue, authorValue, summaryValue);

  if (titleValue.length === 0 || authorValue.length === 0 || summaryValue.length === 0) {
    return displayMessage("warning", "Fields cannot be empty", ".message-container");
  }

  updateArticle(titleValue, authorValue, titleValue);
}

async function updateArticle(title, author, summary) {
  const url = baseUrl + "articles/" + id;

  const data = JSON.stringify({ title: title, summary: summary, author: author });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "Article has been updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.error + " " + json.message, ".message-container");
    }
  } catch (error) {
    displayMessage("error", json.error + " " + json.message, ".message-container");
  }
}

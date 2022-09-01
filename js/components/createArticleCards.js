import { addFavourites, savedFavourites } from "../utils/storageFavourites.js";
import { getUsername } from "../utils/storageLogin.js";

const username = getUsername();
//ideally ask server if jwt token matches username perhaps..

const container = document.querySelector(".container");

const currentFaves = savedFavourites();

export function createArticleCards(articles) {
  container.innerHTML = "";

  articles.forEach(function (article) {
    const date = new Date(article.published_at).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    // for use in the favourite icon, easier to read here
    const dataIds = `
    data-id="${article.id}"
    data-title="${article.title}"
    data-author="${article.author}"
    data-summary="${article.summary}"
    data-published_at="${article.published_at}"
    `;

    // html for edit icon if localstorage has username key.. ideally it would check to see if it was valid on every laod.
    let editIcon = "";
    if (username) {
      editIcon = `<a href="edit.html?id=${article.id}"><i class="fa-regular fa-pen-to-square fa-2x"></i></a>`;
    }

    // far default for empty bookmark, will set fas if bookmark in localstorage.
    let farOrFas = "far";

    let favouriteExists = currentFaves.find(function (bookmark) {
      return parseInt(bookmark.id) === article.id;
    });

    if (favouriteExists) {
      farOrFas = "fas";
    }

    container.innerHTML += `
      <div class="card">
          <div class="card-header">
              <h3>${article.title}</h3>
              <div class="edit-and-bookmark-container">
                 ${editIcon}
                <i ${dataIds} class="${farOrFas} fa-bookmark fa-2x scale"></i>
              </div>
          </div>
          <div class="card-body">
              <p class="card-text">${article.summary}</p>
              <p class="card-text">${article.author} - ${date}</p>
          </div>
        </div>`;
  });
  addFavourites();
}

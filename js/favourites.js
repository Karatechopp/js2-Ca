import displayMessage from "./components/common/displayMessage.js";
import createNav from "./components/createNav.js";
import { savedFavourites } from "./utils/storageFavourites.js";
import { favKey } from "./utils/storageFavourites.js";

createNav();

const currentFavs = savedFavourites();

const container = document.querySelector(".container");
const trashAllFavourites = document.querySelector(".removefavourites");

if (currentFavs.length === 0) {
  container.innerHTML = "No favourites";
} else {
  trashAllFavourites.innerHTML = `<i class="fa-solid fa-trash fa-5x"></i>`;
}

currentFavs.forEach((article) => {
  const date = new Date(article.published_at).toLocaleDateString();
  container.innerHTML += `
  <div class="card">
      <div class="card-header">
          <h3>${article.title}</h3><i class="fas fa-bookmark fa-2x"></i>
      </div>
      <div class="card-body">
          <p class="card-text">${article.summary}</p>
          <p class="card-text">${article.author} - ${date}</p>
      </div>
    </div>
     `;
});

trashAllFavourites.addEventListener("click", removeFavs);

function removeFavs() {
  const remove = confirm("Remove all favourites?");

  if (remove) {
    localStorage.removeItem(favKey);
    displayMessage("success", "Successfully trashed all favourites. Now go find some new ones :)", ".container");
    trashAllFavourites.innerHTML = "";
  }
}

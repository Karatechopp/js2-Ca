export const favKey = "favourites";

export function savedFavourites() {
  const fav = localStorage.getItem(favKey);

  if (fav === null) {
    return [];
  } else {
    return JSON.parse(fav);
  }
}

function favClick() {
  this.classList.toggle("far");
  this.classList.toggle("fas");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const author = this.dataset.author;
  const summary = this.dataset.summary;
  const published_at = this.dataset.published_at;

  const currentFaves = savedFavourites();

  const favExists = currentFaves.find(function (favourite) {
    return favourite.id === id;
  });

  if (favExists === undefined) {
    const fav = { id: id, title: title, author: author, summary: summary, published_at: published_at };
    currentFaves.push(fav);
    saveFav(currentFaves);
  } else {
    const newFav = currentFaves.filter((fav) => fav.id !== id);
    saveFav(newFav);
  }
}

export function addFavourites() {
  const favButtons = document.querySelectorAll(".fa-bookmark");

  favButtons.forEach((heart) => {
    heart.addEventListener("click", favClick);
  });
}

function saveFav(fav) {
  localStorage.setItem(favKey, JSON.stringify(fav));
}

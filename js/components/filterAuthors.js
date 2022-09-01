import { createArticleCards } from "./createArticleCards.js";

export function searchAuthors(authors) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredAuthors = authors.filter(function (author) {
      if (author.author.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    createArticleCards(filteredAuthors);
  };
}

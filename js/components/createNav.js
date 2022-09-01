import { getUsername } from "../utils/storageLogin.js";
import logoutButton from "./logoutButton.js";

export default function createNav() {
  const { pathname } = document.location;

  const navcontainer = document.querySelector(".create-navbar");

  const username = getUsername();

  let authLink = `<button class="nav-link btn primary" id="login" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
  let createAddLink = "";

  if (username) {
    authLink = `<button class="nav-link btn primary" id="logout">Logout</button>`;
    createAddLink = `
    <li class="nav-item">
      <a class="nav-link ${pathname === "/add.html" ? "active" : ""}" href="add.html">Add</a>
    </li>
    `;
  }

  navcontainer.innerHTML = `
<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
  <div class="container-sm">
    <a class="navbar-brand" href="index.html">The Article Website</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav menu">
        <li class="nav-item">
           <a class="nav-link ${pathname === "/index.html" ? "active" : ""}" href="index.html">Home</a>
        </li>
        <li class="nav-item">
           <a class="nav-link ${pathname === "/favourites.html" ? "active" : ""}" href="favourites.html">Favourites</a>
        </li>
      ${createAddLink}
      </ul>
      <ul class="navbar-nav ms-auto">
         <li class="nav-item">
            ${authLink}
          </li>
      </ul>
     </div>
    </div>
   </nav>
`;

  logoutButton();
}

import { baseUrl } from "../../settings/api.js";
import { getJwt } from "../../utils/storageLogin.js";

export default function deleteIconArticle(id) {
  const trashArticle = document.querySelector(".delete-article-icon");

  trashArticle.onclick = async function () {
    console.log(id);

    const doDelete = confirm("Are you sure you want to delete this article?");
    console.log(doDelete);

    if (doDelete) {
      const url = baseUrl + "articles/" + id;

      const jwt = getJwt();

      const options = {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        localStorage.setItem("deleted", "success");

        location.href = "/";
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}

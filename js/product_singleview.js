import { BASE_URL } from "./info.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);

    document.querySelector("span").innerText = product.id;
  });

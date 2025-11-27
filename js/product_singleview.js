import { BASE_URL } from "./info.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    const singleProduct = document.querySelector("#singleProduct");

    singleProduct.querySelector("h2").innerText = product.title;
    singleProduct.querySelector("img").src = product.image;
    singleProduct.querySelector("#price").innerText = `${product.price} kr.`;
    singleProduct.querySelector("#rate").innerText = `${product.rating["rate"]}`;
    singleProduct.querySelector("#count").innerText = `${product.rating["count"]} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  });

const btnBack = document.querySelector("#btnBack");

btnBack.addEventListener("click", () => {
  window.history.back();
});

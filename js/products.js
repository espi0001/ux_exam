import { BASE_URL } from "./info.js";

await fetch(`${BASE_URL}/products`)
  .then((response) => response.json())
  .then((data) => {
    data = data;
    console.log(data);

    data.forEach((product) => {
      singleProduct = document.querySelector("#singleProduct").content.cloneNode(true);
      singleProduct.querySelector("img").src = product.image;
      singleProduct.querySelector("h3").innerText = product.title;
      singleProduct.querySelector("p").innerText = `${product.price} kr.`;

      document.querySelector("#productList").appendChild(singleProduct);
    });
  });

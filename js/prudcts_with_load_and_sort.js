import { BASE_URL } from "./info.js";

const btnLoadMore = document.querySelector("#btnLoadMore");
let allProducts = [];
let visibleProducts = 6;
// let currentSort = null;

// function sortProducts() {
//   if (currentSort === "price-asc") {
//     allProducts.sort((a, b) => a.price - b.price);
//   } else if (currentSort === "price-desc") {
//     allProducts.sort((a, b) => b.price - a.price);
//   }
// }

// const btnSortBy = document.querySelector("#btnSortBy");
// const dropdown = document.querySelector("#sortDropdown");

// btnSortBy.addEventListener("click", () => {
//   dropdown.classList.toggle("hidden");
// });

// dropdown.addEventListener("click", (e) => {
//   const sortType = e.target.dataset.sort;

//   if (!sortType) return;

//   currentSort = sortType;

//   loadProducts();
//   dropdown.classList.add("hidden");
// });

fetch(`${BASE_URL}/products`)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    loadProducts();
  });

function loadProducts() {
  //   sortProducts();
  const productList = document.querySelector("#productList");
  productList.innerHTML = "";

  const productsShown = allProducts.slice(0, visibleProducts);

  productsShown.forEach((product) => {
    const singleProduct = document.querySelector("#singleProduct").content.cloneNode(true);

    singleProduct.querySelector("img").src = product.image;
    singleProduct.querySelector("h3").innerText = product.title;
    singleProduct.querySelector("p").innerText = `${product.price} kr.`;
    singleProduct.querySelector("a").href = `product_singleview.htm?id=${product.id}`;

    productList.appendChild(singleProduct);
  });

  document.querySelector("#shownCount").innerText = productsShown.length;
  document.querySelector("#totalCount").innerText = allProducts.length;

  if (visibleProducts >= allProducts.length) {
    btnLoadMore.style.display = "none";
  }
}

btnLoadMore.addEventListener("click", () => {
  visibleProducts += 6;
  loadProducts();
});

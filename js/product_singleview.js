import { BASE_URL } from "./info.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct = null; // product gets saved ehere, when its fetched

// FETCH PRODUCT & SHOW IT
fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    const singleProduct = document.querySelector("#singleProduct");
    currentProduct = product; // save for later (add to cart)

    singleProduct.querySelector("h2").innerText = product.title;
    singleProduct.querySelector("img").src = product.image;
    singleProduct.querySelector("#price").innerText = `€${product.price.toFixed(2)}`; // The price will have 2 decimals
    singleProduct.querySelector("#rate").innerText = product.rating.rate;
    singleProduct.querySelector("#count").innerText = `${product.rating.count} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  });

// BACK BUTTON
const backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", () => {
    window.history.back();
});

const addToCartBtn = document.querySelector("#addToCartBtn");

// ADD TO CART
addToCartBtn.addEventListener("click", () => {
  if (!currentProduct) return; // Safety, if fetch is not done yet
  addToCart(currentProduct);
});

//Helper: Read cart
function getCart() {
  const raw = localStorage.getItem("cart");
  return raw ? JSON.parse(raw) : [];
}

//Helper: Save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// REAL ADD TO CART
function addToCart(product) {
  const cart = getCart();

  // Does the products allready exsist in the cart?
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1; // add 1 to the amount
  } else {
    cart.push ({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }
  saveCart(cart);

  // alert when adding something to the cart
  alert("Product added to cart");
}
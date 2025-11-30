import { BASE_URL } from "./info.js";
import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct = null; // product gets saved ehere, when its fetched

// BACK BUTTON
const backBtn = document.querySelector("#backBtn"); // VIRKER IKKE

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back();
  });
}
/*
// Get the users email (from login)
// const userEmail = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

// CART
// Get the cart from the logged in user
function getCartKey() {
  const email = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);
  if (!email) return null; // if not logged in then return null
  return `cart${email}`; // key used in both product_singleview.js and cart.js
}


// Read cart 
function getCart() {
  const cartKey = getCartKey(); // check if user is logged in (from SESSION_STORAGE_USER_EMAIL)
  if (!cartKey) return []; // if not logged in then return empty array

  const raw = localStorage.getItem(cartKey);
  return raw ? JSON.parse(raw) : []; 
}

// Save cart
function saveCart(cart) {
  const cartKey = getCartKey();
  if (!cartKey) return; // if not logged in return empty cart (should not happen if we only allow loggen-in users)

  // store cart data as JSON string in localStorage
  localStorage.setItem(cartKey, JSON.stringify(cart));
}
*/

// FETCH PRODUCT & SHOW IT
fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    const singleProduct = document.querySelector("#singleProduct");
    currentProduct = product; // save for later (add to cart)

    singleProduct.querySelector("h2").innerText = product.title;
    const img = singleProduct.querySelector("img");
    img.src = product.image;
    img.alt = product.title;

    singleProduct.querySelector("#price").innerText = `€${product.price.toFixed(2)}`; // The price will have 2 decimals
    singleProduct.querySelector("#rate").innerText = product.rating.rate;
    singleProduct.querySelector("#count").innerText = `${product.rating.count} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  })
  .catch((err) => {
    console.error("Error loading product", err);
  });





// ADD TO CART BUTTON
const addToCartBtn = document.querySelector("#addToCartBtn");

addToCartBtn.addEventListener("click", () => {
  if (!currentProduct) return; // Safety, if fetch is not done yet
  addToCart(currentProduct);
});



// ADD TO CART
function addToCart(product) {
  const cartKey = getCartKey();

  // IF USER IS NOT LOGGED IN
  if (!cartKey) {
    alert("You must be logged in to add products to your cart.");
    return;
  }

  const cart = getCart()
  // checking if the products allready exsist in the cart
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1; // add 1 to the amount if the product already exsist in the cart
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
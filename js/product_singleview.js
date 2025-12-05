import { BASE_URL } from "./info.js";
import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage handling
import { updateCartCounter } from "./cartCounter.js"; // module for updating the cart counter

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct = null; // product gets saved ehere, when its fetched

// BACK BUTTON
const backBtn = document.querySelector("#backBtn");

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back(); // Navigate back in browser history
  });
}

// FETCH PRODUCT & SHOW IT
fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json()) // Convert the response into JSON
  .then((product) => {
    const singleProduct = document.querySelector("#singleProduct");
    currentProduct = product; // save product for the Add to Cart button

    // Insert product data into the page
    singleProduct.querySelector("h2").innerText = product.title;
    singleProduct.querySelector("h4").innerText = product.category;

    const img = singleProduct.querySelector("img");
    img.src = product.image;
    img.alt = product.title;

    singleProduct.querySelector("#price").innerText = `€${product.price.toFixed(2)}`; // Format the price to have 2 decimals
    singleProduct.querySelector("#rate").innerText = product.rating.rate;
    singleProduct.querySelector("#count").innerText = `${product.rating.count} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  })
  .catch((err) => {
    console.error("Error loading product", err); // Debuggin if something goes wrong
  });

// ADD TO CART BUTTON
const addToCartBtn = document.querySelector("#addToCartBtn");

// When clicked -> add the product to the cart
addToCartBtn.addEventListener("click", () => {
  if (!currentProduct) return; // Safety, if fetch is not done yet / product not loaded yet
  addToCart(currentProduct);
});

// ADD PRODUCT TO CART
function addToCart(product) {
  // Get current user's cart key (null if not logged in)
  const cartKey = getCartKey(); // From cartStorage.js module

  // If user is NOT logged in -> Show alert and stop
  if (!cartKey) {
    alert("You must be logged in to add products to your cart.");
    return;
  }

  // Load the user's cart from localStorage
  const cart = getCart(); // From cartStorage.js module

  // Check if the product allready exists in the cart
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1; // add 1 to the amount if the product already exsist in the cart
  } else {
    // Else add ned product with quantity = 1
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  // Save updated cart back to localStorage
  saveCart(cart); // From cartStorage.js module

  // Feedback for user when adding something to the cart
  // TODO - Maybe make a "toast thing as the feedback"
  // alert("Product added to cart");

  // Update the cart counter
  updateCartCounter();
}
// Update cart counter when page loads
updateCartCounter();

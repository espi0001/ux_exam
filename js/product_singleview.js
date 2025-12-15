import { BASE_URL } from "./info.js";
import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage handling
import { updateCartCounter } from "./cartCounter.js"; // module for updating the cart counter
import { showModal } from "./modal.js"; // import showModal function

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct = null; // product gets saved here, when its fetched

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
    img.alt = `${product.title} - Product image`; // Mere beskrivende alt text

    singleProduct.querySelector("#price").innerText = `€${product.price.toFixed(2)}`; // Format the price to have 2 decimals
    singleProduct.querySelector("#rate").innerText = product.rating.rate;
    singleProduct.querySelector("#count").innerText = `${product.rating.count} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  })
  .catch((err) => {
    console.error("Error loading product", err); // Debugging if something goes wrong
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

  // If user is NOT logged in -> Show login prompt modal
  if (!cartKey) {
    showModal("Login required", "You must be logged in to add products to your cart.", "Go to log in", "login.htm");
    return;
  }

  // Load the user's cart from localStorage
  const cart = getCart(); // From cartStorage.js module

  // Check if the product already exists in the cart
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1; // add 1 to the amount if the product already exists in the cart
  } else {
    // Else add new product with quantity = 1
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

  // Show success modal
  showModal("Added to cart", "Product has been added to your cart!", "Go to cart", "cart.htm");

  // Update the cart counter
  updateCartCounter();
}

// Update cart counter when page loads
updateCartCounter();

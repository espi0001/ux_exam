import { BASE_URL } from "./info.js";
import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage handling
import { updateCartCounter } from "./cartCounter.js"; // module for updating the cart counter
import { showModal } from "./modal.js"; // import showModal function
import { backButton } from "./backBtn.js";

backButton();

let currentProduct = null;

async function loadProduct() {
  const singleProduct = document.querySelector("#singleProduct");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!singleProduct) return;

  if (!id) {
    singleProduct.innerHTML = `<p class="error">Product not found.</p>`;
    return;
  }

  if (singleProduct) {
    const h2 = singleProduct.querySelector("h2");
    if (h2) h2.textContent = "Loading product...";
  }

  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    currentProduct = product;

    singleProduct.querySelector("h2").innerText = product.title;
    singleProduct.querySelector("h4").innerText = product.category;

    const img = singleProduct.querySelector("img");
    img.src = product.image;
    img.alt = `Image of ${product.title}`;

    singleProduct.querySelector("#price").innerText = `${product.price.toFixed(2)} €`;
    singleProduct.querySelector("#rate").innerText = product.rating.rate;
    singleProduct.querySelector("#count").innerText = `${product.rating.count} reviews`;
    singleProduct.querySelector("#description").innerText = product.description;
  } catch (error) {
    console.error("Error loading product:", error);
    singleProduct.innerHTML = `<p class="error">Could not load product right now. Please try again later.</p>`;
  }
}

loadProduct();

const addToCartBtn = document.querySelector("#addToCartBtn");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    if (!currentProduct) return;
    addToCart(currentProduct);
  });
}

// ADD PRODUCT TO CART
function addToCart(product) {
  const cartKey = getCartKey();
  if (!cartKey) {
    showModal("Login required", "You must be logged in to add products to your cart.", "Go to log in", "login.htm");
    return;
  }

  const cart = getCart();

  // Check if the product already exists in the cart
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);

  showModal("Added to cart", "Product has been added to your cart!", "Go to cart", "cart.htm");

  updateCartCounter();
}

updateCartCounter();

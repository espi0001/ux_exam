import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage
import { updateCartCounter } from "./cartCounter.js"; // module for updating the cart counter
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

const cartItemsContainer = document.querySelector("#cartItems");
const cartItemTemplate = document.querySelector("#cartItemTemplate");

// BACK BUTTON
const backBtn = document.querySelector("#backBtn");

if (backBtn) {
  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back(); // Navigate back in browser history
  });
}

// Different states of cart
const notLoggedIn = document.querySelector("#notLoggedIn"); // 1. User is NOT logged in
const cartEmpty = document.querySelector("#cartEmpty"); // 2. User IS logged in, but NO items in cart
const cartFilled = document.querySelector("#cartFilled"); // 3. User IS logged in and HAS items in cart

function updateView(cart) {
  const isLoggedIn = !!getCartKey(); // true if a user is logged in (email in sessionStorage)
  const hasItems = cart && cart.length > 0; // true if there are items in the cart

  if (cartEmpty) cartEmpty.classList.add("hidden");
  if (cartFilled) cartFilled.classList.add("hidden");

  if (!hasItems) {
    // 2. User IS logged in, but NO items in cart
    if (cartEmpty) cartEmpty.classList.remove("hidden");
  } else {
    // 3. User IS logged in and HAS items in cart
    if (cartFilled) cartFilled.classList.remove("hidden");
  }
}

// Summary price
const subtotalAmount = document.querySelector("#subtotalAmount");

// export function formatPrice(amount) {
//   return `${amount.toFixed(2)} €`; // currency string
// }

// Update the subtotal section in the cart summary
function updateSummary(subtotal) {
  // If the element is not found in the HTML, then stop the function.
  // Prevents errors like: Cannot set textContent of null
  if (!subtotalAmount) return;

  subtotalAmount.textContent = formatPrice(subtotal); // Insert the subtotal into the <p id="subtotalAmount">
}

// Render (makes it visible) all cart items inside the cart page
function renderCart() {
  // Get the current user's cart form local storage
  const cart = getCart(); // From cartStorage.js module

  updateView(cart); // Update which view should be shown (login, empty cart, or full cart)

  const isLoggedIn = !!getCartKey(); // Check if user is logged in (true if getCartKey() returns a key)

  // If the user is NOT logged in OR cart is empty:
  // Clear the item list and show subtotal = 0
  if (!isLoggedIn || cart.length === 0) {
    if (cartItemsContainer) cartItemsContainer.innerHTML = "";
    updateSummary(0); // show 0.00€
    return; // stop here (nothing more to render -> nothing more to make visible)
  }

  cartItemsContainer.innerHTML = ""; // If there are items, clear the container before re-rendering them

  const fragment = document.createDocumentFragment(); // Create a fragment so we can append multiple items efficiently

  // let subtotal = 0; // Keep track of subtotal (sum of item prices)

  // Loop through every item in the cart
  cart.forEach((item) => {
    const qty = item.quantity ?? 1; // Quantity fallback: use item.quantity or default 1
    const node = cartItemTemplate.content.cloneNode(true); // Clone the <template> content so we can populate it

    // IMAGE
    const img = node.querySelector(".product_image img");
    img.src = item.image; // set image url
    img.alt = item.title; // set alt text as the same as the title
    img.loading = "lazy"; // Question: maybe not needed

    // TEXT
    node.querySelector(".product_name").textContent = item.title;
    node.querySelector(".product_price").textContent = formatPrice(item.price * qty);

    // QUANTITY DISPLAY (-/+ buttons)
    const qtyDisplay = node.querySelector(".product_qty");
    qtyDisplay.textContent = String(qty);

    // find both +/- buttons for this product
    const qtyButtons = node.querySelectorAll(".quantity-change");

    qtyButtons.forEach((qbtn) => {
      const change = Number(qbtn.dataset.change) || 0; // -1 or +1

      qbtn.addEventListener("click", () => {
        // new quantity = current quantity + change
        const newQty = Math.max(1, qty + change); // minimum 1

        updateCartItem(item.id, newQty);
      });
    });

    // REMOVE BUTTON
    const removeBtn = node.querySelector(".product_remove_btn");
    removeBtn.addEventListener("click", () => {
      removeCartItem(item.id); // remove item from cart
    });

    fragment.appendChild(node); // Add this rendered item to the fragment

    // subtotal += item.price * qty; // Add item's price x wuantity to subtotal
  });

  cartItemsContainer.appendChild(fragment); // Add all rendered items to the cart container in one go

  // updateSummary(subtotal); // Update subtotal display
  updateSummary(getCartSubtotal()); // Update subtotal display

  updateCartCounter(); // Update cart counter
}

// EDIT CART

// Update the quantity for at single cart item
function updateCartItem(id, quantity) {
  // Get the current cart form localStorage
  const cart = getCart(); // From cartStorage.js module

  const item = cart.find((product) => product.id === id); // Find the item in the cart that matches the given id

  if (!item) return; // If the item does not exsist (safety check), stop the function

  item.quantity = quantity; // Update the item's quantity to the new value

  // Save the updated cart back to localStorage
  saveCart(cart); // From cartStorage.js module

  updateCartCounter(); // Update cart counter

  renderCart(); // Re-render the entire cart to show the new totals and prices at once
}

// Remove an item from the cart
function removeCartItem(id) {
  // Load the current cart
  let cart = getCart(); // From cartStorage.js module

  // Filter out (remove) the product with the matching id
  // All other products remain in the cart
  cart = cart.filter((product) => product.id !== id);

  // Save the updated cart to localStorage
  saveCart(cart); // From cartStorage.js module

  updateCartCounter(); // Update cart counter

  renderCart(); // Re-render the cart so the removed items disappears at once
}

// Render the cart when this module loads (DOM is ready because of type="module")
// Render cart immediately (module runs after HTML is parsed)
renderCart();

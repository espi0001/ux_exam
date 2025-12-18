import { getCart, saveCart, getCartKey } from "./cartStorage.js";
import { updateCartCounter } from "./cartCounter.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";
import { backButton } from "./backBtn.js";

// BACK BUTTON
backButton();

// Render (makes it visible) all cart items inside the cart page
function renderCart() {
  const cartItemsContainer = document.querySelector("#cartItems");
  const cartItemTemplate = document.querySelector("#cartItemTemplate");
  const cart = getCart(); 

  updateView(cart); 

  const isLoggedIn = !!getCartKey(); // Check if user is logged in 

  // Clear the item list and show subtotal = 0
  if (!isLoggedIn || cart.length === 0) {
    if (cartItemsContainer) cartItemsContainer.innerHTML = "";
    updateSummary(0); 
    return; 
  }

  cartItemsContainer.innerHTML = ""; // If there are items, clear the container before re-rendering them

  const fragment = document.createDocumentFragment(); 


  cart.forEach((item) => {
    const qty = item.quantity ?? 1;
    const node = cartItemTemplate.content.cloneNode(true); 

    // IMAGE
    const img = node.querySelector(".product_image img");
    img.src = item.image;
    img.alt = item.title;
    img.loading = "lazy";

    // TEXT
    node.querySelector(".product_name").textContent = item.title;
    node.querySelector(".product_price").textContent = formatPrice(item.price * qty);

    // QUANTITY DISPLAY (-/+ buttons)
    const qtyDisplay = node.querySelector(".product_qty");
    qtyDisplay.textContent = String(qty);

    const qtyButtons = node.querySelectorAll(".quantity-change");

    qtyButtons.forEach((qbtn) => {
      const change = Number(qbtn.dataset.change) || 0; // -1 or +1

      qbtn.addEventListener("click", () => {
        const newQty = Math.max(1, qty + change); // minimum 1
        updateCartItem(item.id, newQty);
      });
    });

    // REMOVE BUTTON
    const removeBtn = node.querySelector(".product_remove_btn");
    removeBtn.addEventListener("click", () => {
      removeCartItem(item.id); 
    });

    fragment.appendChild(node);
  });

  cartItemsContainer.appendChild(fragment); 

  updateSummary(getCartSubtotal());

  updateCartCounter();
}

renderCart();


// Different states of cart
function updateView(cart) {
  const cartEmpty = document.querySelector("#cartEmpty"); 
  const cartFilled = document.querySelector("#cartFilled");

  const hasItems = cart && cart.length > 0; // true if there are items in the cart

  if (cartEmpty) cartEmpty.classList.add("hidden");
  if (cartFilled) cartFilled.classList.add("hidden");

  if (!hasItems) {
    if (cartEmpty) cartEmpty.classList.remove("hidden");
  } else {
    if (cartFilled) cartFilled.classList.remove("hidden");
  }
}


// Update the subtotal
function updateSummary(subtotal) {
  const subtotalAmount = document.querySelector("#subtotalAmount");
  if (!subtotalAmount) return;

  subtotalAmount.textContent = formatPrice(subtotal);
}



// Update the quantity
function updateCartItem(id, quantity) {
  const cart = getCart(); 
  const item = cart.find((product) => product.id === id);

  if (!item) return; // If the item does not exsist (safety check), stop the function

  item.quantity = quantity;

  saveCart(cart);

  updateCartCounter();

  renderCart();
}

// Remove an item from the cart
function removeCartItem(id) {
  let cart = getCart();
  cart = cart.filter((product) => product.id !== id);

  saveCart(cart);

  updateCartCounter(); 

  renderCart();
}

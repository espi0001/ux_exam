import { saveCart, getCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

const checkoutTotal = document.querySelector("#checkoutTotal");
const form = document.querySelector("#frmCheckout");

// Show total when the page loads
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cart = getCart();
  if (!cart || cart.length === 0) {
    showModal("Checkout error", "Your cart is empty. Please add products first.", "Browse products", "index.html");
    return;
  }

  saveCart([]);
  form.reset();
  showModal("Payment received", "Your order is being shipped", "Go back to all products", "index.html");
});

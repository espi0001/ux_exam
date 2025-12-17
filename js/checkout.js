import { saveCart, getCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

// Show total when the page loads
const checkoutTotal = document.querySelector("#checkoutTotal");
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

const form = document.querySelector("#frmCheckout");
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

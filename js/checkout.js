import { saveCart, getCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

const checkoutTotal = document.querySelector("#checkoutTotal");
const form = document.querySelector("#frmCheckout");
const submitBtn = form.querySelector("button[type='submit']");

// Show total when the page loads
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);

  // Disable submit if cart is empty
  if (subtotal === 0) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Cart is empty";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Extra check in case the button was somehow enabled
  const cart = getCart();
  if (!cart || cart.length === 0) {
    showModal("Checkout error", "Your cart is empty. Please add items first.");
    return;
  }

  // Clear cart and show success modal
  saveCart([]);
  form.reset();
  showModal("Payment received", "Your order is being shipped", "Go back to all products", "index.html");

  // Disable the button again after successful checkout
  submitBtn.disabled = true;
  submitBtn.textContent = "Cart is empty";
});

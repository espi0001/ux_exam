import { saveCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

const checkoutTotal = document.querySelector("#checkoutTotal");

// vis total når siden loader
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

const form = document.querySelector("#frmCheckout");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  saveCart([]);

  form.reset();

  showModal("Payment received", "Your order is being shipped", "Go back to all products", "index.html");
});

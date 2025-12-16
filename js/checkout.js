import { saveCart } from "./cartStorage.js";
import { showModalBtn } from "./modal_btn.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

const checkoutTotal = document.querySelector("#checkoutTotal");

// vis total når siden loader
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

document.querySelector("#frmCheckout").addEventListener("submit", (e) => {
  e.preventDefault();

  saveCart([]);

  showModalBtn("Payment received", "Your order is being shipped", "Go back to all products", "index.html");
});



import { saveCart } from "./cartStorage.js";
import { showModal } from "./modal.js";

document.querySelector("#frmCheckout").addEventListener("submit", (e) => {
  e.preventDefault();

  saveCart([]);

  showModal("Payment received", "Your order is being shipped");
});

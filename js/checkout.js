import { saveCart, getCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";
import { backButton } from "./backBtn.js";

// BACK BUTTON
backButton();

// Show total when the page loads
const checkoutTotal = document.querySelector("#checkoutTotal");
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

// Format credit card number: space after every 4 digits
const cardNumberInput = document.querySelector("#txtCardNumber");
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16); // Remove all "not" digits
    const formatted = value.match(/.{1,4}/g)?.join(" ") ?? value; // insert space after efter 4. digtis
    e.target.value = formatted;
  });
}

// Format expiry date: MM/YY
const expiryInput = document.querySelector("#txtExpiryDate");
if (expiryInput) {
  expiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    e.target.value = value;
  });
}


const form = document.querySelector("#frmCheckout");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Let the browser handle field validation (required/minlength/pattern)
    if (!form.checkValidity()) {
      form.reportValidity(); 
      return;
    }

    // If cart is empty
    const cart = getCart();
    if (!cart || cart.length === 0) {
      showModal("Checkout error", "Your cart is empty. Please add products first.", "Browse products", "index.html");
      return;
    }
  
    // Success
    saveCart([]);
    form.reset();
    showModal("Payment received", "Your order is being shipped", "Go back to all products", "index.html");
  });
}

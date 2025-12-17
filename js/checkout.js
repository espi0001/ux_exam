import { saveCart, getCart } from "./cartStorage.js";
import { showModal } from "./modal.js";
import { getCartSubtotal, formatPrice } from "./cartTotal.js";

// Show total when the page loads
const checkoutTotal = document.querySelector("#checkoutTotal");
const form = document.querySelector("#frmCheckout");
const cardNumberInput = document.querySelector("#txtCardNumber");

// Show total when the page loads
if (checkoutTotal) {
  const subtotal = getCartSubtotal();
  checkoutTotal.textContent = formatPrice(subtotal);
}

// Automatisk formatering af credit card nummer med mellemrum efter hver 4. cifre
if (cardNumberInput) {
  cardNumberInput.addEventListener("input", (e) => {
    // Fjern alle ikke-cifre
    let value = e.target.value.replace(/\D/g, "");

    // Indsæt mellemrum efter hver 4. cifre
    let formatted = value.match(/.{1,4}/g)?.join(" ") || value;

    // Opdater værdien (men begræns til 18 cifre)
    if (value.length <= 16) {
      e.target.value = formatted;
    } else {
      // Hvis der er mere end 18 cifre, beholde de første 18
      value = value.substring(0, 16);
      formatted = value.match(/.{1,4}/g)?.join(" ") || value;
      e.target.value = formatted;
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Hent værdier fra formular (ligesom i signup.js)
  const deliveryAddress = e.target.txtDeliveryAddress.value.trim();
  const billingAddress = e.target.txtBillingAddress.value.trim();
  const cardNumber = e.target.txtCardNumber.value.trim();

  // Valider Delivery Address
  if (deliveryAddress.length < 2) {
    showModal("Validation error", "Delivery Address must be at least 2 characters long.", "", "");
    return;
  }

  const addressRegex = /^(?=.*[a-zA-Z])(?=.*\d).{2,}$/;
  if (!addressRegex.test(deliveryAddress)) {
    showModal("Validation error", "Delivery Address must contain at least one letter and one number.", "", "");
    return;
  }

  // Valider Billing Address
  if (billingAddress.length < 2) {
    showModal("Validation error", "Billing Address must be at least 2 characters long.", "", "");
    return;
  }

  if (!addressRegex.test(billingAddress)) {
    showModal("Validation error", "Billing Address must contain at least one letter and one number.", "", "");
    return;
  }

  // Valider Credit Card Number
  const cleanedCard = cardNumber.replace(/\s/g, "");
  if (!/^\d{12,16}$/.test(cleanedCard)) {
    showModal("Validation error", "Credit Card Number must be 12-16 digits.", "", "");
    return;
  }

  const cart = getCart();
  if (!cart || cart.length === 0) {
    showModal("Checkout error", "Your cart is empty. Please add products first.", "Browse products", "index.html");
    return;
  }

  saveCart([]);
  form.reset();
  showModal("Payment received", "Your order is being shipped", "Go back to all products", "index.html");
});

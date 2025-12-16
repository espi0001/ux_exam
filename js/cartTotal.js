import { getCart } from "./cartStorage.js";

// Calculate the subtotal for all items in the cart
export function getCartSubtotal() {
  const cart = getCart();
  if (!cart || cart.length === 0) return 0; // If the cart is empty or missing, return 0 to avoid errors

  // Loop through all items and add price * quantity to the total
  return cart.reduce((sum, item) => {
    const qty = item.quantity ?? 1; // Default to 1 if quantity is missing
    return sum + item.price * qty;
  }, 0);
}

// Format a number into a readable currency string
export function formatPrice(amount) {
  return `${amount.toFixed(2)}€`; // Always show 2 decimals + currency
}

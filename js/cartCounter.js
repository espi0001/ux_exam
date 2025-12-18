import { getCart } from "./cartStorage.js";

// Calculate total number of items in cart (sum of all quantities)
function getCartItemCount() {
  const cart = getCart();

  // If cart is empty or user not logged in, return 0
  if (!cart || cart.length === 0) return 0;

  // Sum up all quantities in the cart
  const total = cart.reduce((sum, item) => {
    const qty = item.quantity ?? 1; // fallback to 1 if quantity is missing
    return sum + qty;
  }, 0);

  return total;
}

// Update the cart counter display on the page
export function updateCartCounter() {
  const count = getCartItemCount();
  const counterElements = document.querySelectorAll("#cartCounter");

  // Update all counter elements (in case there are multiple on the page)
  counterElements.forEach((counter) => {
    counter.textContent = count;

    // Hide counter if count is 0
    if (count === 0) {
      counter.style.display = "none";
    } else {
      counter.style.display = "flex"; // Use flex to maintain centering
    }
  });
}

// Update cart counter when page loads
updateCartCounter();

// Also update when page becomes visible (when navigating back to the page)
// document.addEventListener("visibilitychange", () => {
//   if (!document.hidden) {
//     updateCartCounter();
//   }
// });

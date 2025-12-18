import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

// Get the storage key for the current user's cart
export function getCartKey() {
  const email = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);
  if (!email) return null;
  return `cart${email}`;
}

// Read cart from localStorage for the current user
export function getCart() {
  const cartKey = getCartKey();
  if (!cartKey) return [];

  const raw = localStorage.getItem(cartKey);
  if (raw) {
    return JSON.parse(raw);
  } else {
    return [];
  }
}

// Save cart to localStorage for the current user
export function saveCart(cart) {
  const cartKey = getCartKey();
  if (!cartKey) return;

  localStorage.setItem(cartKey, JSON.stringify(cart));
}

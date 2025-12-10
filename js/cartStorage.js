import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";


// Get the storage key for the current user's cart
export function getCartKey() {
    const email = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);
    if (!email) return null; // no cart if not logged in
    return `cart${email}`; // same key used everywhere
}



// Read cart from localStorage for the current user
export function getCart() {
    const cartKey = getCartKey();
    if (!cartKey) return []; // empty cart if not logged in

    const raw = localStorage.getItem(cartKey);
    // return raw ? JSON.parse(raw) : []; // This is a ternary operator - short way to write if/else
    // raw is the value we get from localstorage 
        // - if there is a value (If raw is NOT null) then parse JSON-string to the array
        // - (else) if there is not value (raw IS null), return empty array
    
    if (raw) {
        return JSON.parse(raw);
    } else {
        return []; // empty array
    }
}


// Save cart to localStorage for the current user
export function saveCart(cart) {
    const cartKey = getCartKey();
    if (!cartKey) return; // safety check

    localStorage.setItem(cartKey, JSON.stringify(cart));
}
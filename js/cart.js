// import { SESSION_STORAGE_USER_EMAIL } from "./info.js";
// import { getCart, saveCart, getCartKey } from "./cartStorage";
import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage


const cartItemsContainer = document.querySelector('#cartItems');
const cartItemTemplate = document.querySelector('#cartItemTemplate');

const DELIVERY_FLAT = 3.8; // delivery price

// BACK BUTTON
const backBtn = document.querySelector("#backBtn"); // VIRKER IKKE

if (backBtn) {
    backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back();
    });
}
/*
function getCartKey() {
    const email = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);
    if (!email) return null; // no cart if not logged in
    return `cart${email}`; // key used in both product_singleview.js and cart.js
}

function getCart() {
    const cartKey = getCartKey();
    if (!cartKey) return []; // if not logged in return empty cart (should not happen if we only allow loggen-in users)


    // QUESTION: hvad gør dette?
    const raw = localStorage.getItem(cartKey);
    return raw ? JSON.parse(raw) : []; 
}


// Question: understand this
function saveCart(cart) {
    const cartKey = getCartKey();
    if (!cartKey) return; // if not logged in return empty cart (should not happen if we only allow loggen-in users)
    
    // store cart data as JSON string in localStorage
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

 */

function formatPrice(amount) {
    // currency string
    return `${amount.toFixed(2)} €`;
}


// show different states

const mainSections = document.querySelectorAll("main > section");
// 0: "login to see your cart"
// 1: "your cart is empty"
// 2: actual cart layout
const loginSection = mainSections[0]; // 1. User is NOT logged in
const emptySection = mainSections[1]; // 2. User IS logged in, but NO items in cart
const cartSection = mainSections[2]; // 3. User IS logged in and HAS items in cart

function updateView(cart) {
    const isLoggedIn = !!getCartKey(); // true if a user is logged in (email in sessionStorage)
    const hasItems = cart && cart.length > 0; // true if there are items in the cart

    if (!isLoggedIn) {
        // 1. User is NOT logged in
        if (loginSection) loginSection.classList.remove("hidden");
        if (emptySection) emptySection.classList.add("hidden")
        if (cartSection) cartSection.classList.add("hidden");
    } else if (!hasItems) {
        // 2. User IS logged in, but NO items in cart
        if (loginSection) loginSection.classList.add("hidden")
        if (emptySection) emptySection.classList.remove("hidden")
        if (cartSection) cartSection.classList.add("hidden");
    } else {
        // 3. User IS logged in and HAS items in cart
        if (loginSection) loginSection.classList.add("hidden")
        if (emptySection) emptySection.classList.add("hidden")
        if (cartSection) cartSection.classList.remove("hidden");
    }
}


// render summary
const subtotalAmount = document.querySelector('#subtotalAmount');
const deliveryAmount = document.querySelector('#deliveryAmount');
const totalAmount = document.querySelector('#totalAmount');

function updateSummary(subtotal) {
    const delivery = subtotal > 0 ? DELIVERY_FLAT : 0;
    const total = subtotal + delivery;

    subtotalAmount.textContent = formatPrice(subtotal);
    deliveryAmount.textContent = formatPrice(delivery);
    totalAmount.textContent = formatPrice(total);
}

// render cart items 
function renderCart() {
    const cart = getCart();

    updateView(cart);

    const isLoggedIn = !!getCartKey();

    // if not logged in or empty cart: Show the sum of = 0
    if (!isLoggedIn || cart.length === 0) {
        if (cartItemsContainer) cartItemsContainer.innerHTML = "";
        updateSummary(0);
        return;
    }
    
    cartItemsContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();
    let subtotal = 0;


    cart.forEach((item) => {
    const qty = item.quantity ?? 1;

    const node = cartItemTemplate.content.cloneNode(true);


    // IMAGE
    const img = node.querySelector('.product_image img');
    img.src = item.image;
    img.alt = item.title;
    img.loading = 'lazy';

    // TEXT
    node.querySelector('.product_name').textContent = item.title;
    node.querySelector('.product_price').textContent = formatPrice(item.price * qty);

    // QUANTITY SELECT
    const qtySelect = node.querySelector('.product_qty');
    qtySelect.value = String(qty);

    qtySelect.addEventListener('change', (e) => {
        const newQty = Number(e.target.value);
        updateCartItem(item.id, newQty);
    });

    // REMOVE BUTTON
    const removeBtn = node.querySelector('.product_remove_btn');
    removeBtn.addEventListener('click', () => {
        removeCartItem(item.id);
    });

    fragment.appendChild(node);

    subtotal += item.price * qty;
    });

    cartItemsContainer.appendChild(fragment);
    updateSummary(subtotal);
}

// EDIT CART

// QUANTITY UPDATE
function updateCartItem(id, quantity) {
    const cart = getCart();
    const item = cart.find((product) => product.id === id);
    if (!item) return;

    item.quantity = quantity;
    saveCart(cart);
    renderCart(); // re-render to update prices and totals
}

// REMOVE ITEM
function removeCartItem(id) {
    let cart = getCart();
    cart = cart.filter((product) => product.id !== id);
    saveCart(cart);
    renderCart();
}

// RENDER
document.addEventListener('DOMContentLoaded', renderCart);
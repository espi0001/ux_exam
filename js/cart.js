import { getCart, saveCart, getCartKey } from "./cartStorage.js"; // modules for localstorage


const cartItemsContainer = document.querySelector('#cartItems');
const cartItemTemplate = document.querySelector('#cartItemTemplate');


// BACK BUTTON
const backBtn = document.querySelector("#backBtn");

if (backBtn) {
    backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.history.back(); // Navigate back in browser history
    });
}


// show different states of cart
const notLoggedIn = document.querySelector("#notLoggedIn"); // 1. User is NOT logged in
const cartEmpty = document.querySelector("#cartEmpty"); // 2. User IS logged in, but NO items in cart
const cartFilled = document.querySelector("#cartFilled"); // 3. User IS logged in and HAS items in cart

function updateView(cart) {
    const isLoggedIn = !!getCartKey(); // true if a user is logged in (email in sessionStorage)
    const hasItems = cart && cart.length > 0; // true if there are items in the cart

    if (!isLoggedIn) {
        // 1. User is NOT logged in
        if (notLoggedIn) notLoggedIn.classList.remove("hidden");
    } else if (!hasItems) {
        // 2. User IS logged in, but NO items in cart
        if (cartEmpty) cartEmpty.classList.remove("hidden")
    } else {
        // 3. User IS logged in and HAS items in cart
        if (cartFilled) cartFilled.classList.remove("hidden");
    }
}


// Summary price
const subtotalAmount = document.querySelector('#subtotalAmount');


function formatPrice(amount) {
    // currency string
    return `${amount.toFixed(2)} €`;
}

// Update the subtotal section in the cart summary
function updateSummary(subtotal) {
    // If the element is not found in the HTML, then stop the function. 
    // Prevents errors like: Cannot set textContent of null
    if (!subtotalAmount) return;

    // Insert the subtotal into the <p id="subtotalAmount"> 
    subtotalAmount.textContent = formatPrice(subtotal)
}



// Render (makes it visible) all cart items inside the cart page
function renderCart() {
    // Get the current user's cart form local storage
    const cart = getCart(); // From cartStorage.js module

    // Update which view should be shown (login, empty cart, or full cart)
    updateView(cart);

    // Check if user is logged in (true if getCartKey() returns a key)
    const isLoggedIn = !!getCartKey();

    // If the user is NOT logged in OR cart is empty: 
        // Clear the item list and show subtotal = 0 
    if (!isLoggedIn || cart.length === 0) {
        if (cartItemsContainer) cartItemsContainer.innerHTML = "";
        updateSummary(0); // show 0.00€
        return; // stop here (nothing more to render -> nothing more to make visible)
    }
    
    // If there are items, clear the container before re-rendering them
    cartItemsContainer.innerHTML = "";

    // Create a fragment so we can append multiple items efficiently
    const fragment = document.createDocumentFragment();
    
    // Keep track of subtotal (sum of item prices)
    let subtotal = 0;


    // Loop through every item in the cart
    cart.forEach((item) => {
        // Quantity fallback: use item.quantity or default 1
        const qty = item.quantity ?? 1;

        // Clone the <template> content so we can populate it
        const node = cartItemTemplate.content.cloneNode(true);


        // IMAGE 
        const img = node.querySelector('.product_image img');
        img.src = item.image; // set image url
        img.alt = item.title; // set alt text as the same as the title
        img.loading = 'lazy'; // Question: maybe not needed

        // TEXT
        node.querySelector('.product_name').textContent = item.title;
        node.querySelector('.product_price').textContent = formatPrice(item.price * qty);

        // QUANTITY SELECT
        // TODO: a maximum amount 
        const qtySelect = node.querySelector('.product_qty');
        qtySelect.value = String(qty); // set default value in dropdown

        // When user changes quantity -> update item in cart
        qtySelect.addEventListener('change', (e) => {
            const newQty = Number(e.target.value);
            updateCartItem(item.id, newQty);
        });


        // REMOVE BUTTON
        const removeBtn = node.querySelector('.product_remove_btn');
        removeBtn.addEventListener('click', () => {
            removeCartItem(item.id); // remove item from cart
        });

        // Add this rendered item to the fragment
        fragment.appendChild(node);

        // Add item's price x wuantity to subtotal
        subtotal += item.price * qty;
    });

    // Add all rendered items to the cart container in one go
    cartItemsContainer.appendChild(fragment);

    // Update subtotal display
    updateSummary(subtotal);
}

// EDIT CART

// Update the quantity for at single cart item
function updateCartItem(id, quantity) {
    // Get the current cart form localStorage
    const cart = getCart(); // From cartStorage.js module
    
    // Find the item in the cart that matches the given id
    const item = cart.find((product) => product.id === id);
    
    // If the item does not exsist (safety check), stop the function
    if (!item) return;

    // Update the item's quantity to the new value
    item.quantity = quantity;

    // Save the updated cart back to localStorage
    saveCart(cart); // From cartStorage.js module
    
    // Re-render the entire cart to show the new totals and prices at once
    renderCart(); 
}

// Remove an item from the cart
function removeCartItem(id) {

    // Load the current cart
    let cart = getCart(); // From cartStorage.js module

    // Filter out (remove) the product with the matching id
    // All other products remain in the cart
    cart = cart.filter((product) => product.id !== id);

    // Save the updated cart to localStorage
    saveCart(cart); // From cartStorage.js module

    // Re-render the cart so the removed items disappears at once
    renderCart();
}

// Render the cart as soon as the page has fully loaded 
// Question: Har Arturo ikke noget imod DOMContentLoaded???
document.addEventListener('DOMContentLoaded', renderCart);
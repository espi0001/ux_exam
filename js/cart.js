import { BASE_URL, USERS_BASE_URL, SESSION_STORAGE_USER_EMAIL } from "./info.js";

// ===== DOM =====
const cartItemsContainer = document.querySelector('#cartItems');
const cartItemTemplate = document.querySelector('#cartItemTemplate');

const subtotalAmount = document.querySelector('#subtotalAmount');
const deliveryAmount = document.querySelector('#deliveryAmount');
const totalAmount = document.querySelector('#totalAmount');

const DELIVERY_FLAT = 29; // example delivery price



function getCart() {
    // cart is an array of product objects with at least: id, title, price, image, quantity
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formatPrice(amount) {
    // simple currency string; adjust if you need DKK locale formatting
    return `${amount.toFixed(2)} kr`;
}

async function getProducts() {
    
}

// ---------- render summary ----------

function updateSummary(subtotal) {
  const delivery = subtotal > 0 ? DELIVERY_FLAT : 0;
  const total = subtotal + delivery;

  subtotalAmount.textContent = formatPrice(subtotal);
  deliveryAmount.textContent = formatPrice(delivery);
  totalAmount.textContent = formatPrice(total);
}

// ---------- render cart items ----------

function renderCart() {
  const cart = getCart();

  cartItemsContainer.innerHTML = '';

  // handle “cart is empty” / “login to see cart” sections later if you want
  if (cart.length === 0) {
    updateSummary(0);
    return;
  }

  const fragment = document.createDocumentFragment();
  let subtotal = 0;

  cart.forEach(item => {
    const qty = item.quantity ?? 1;

    const node = cartItemTemplate.content.cloneNode(true);
    const article = node.querySelector('.product');

    // image
    const img = node.querySelector('.product_image img');
    img.src = item.image;
    img.alt = item.title;
    img.loading = 'lazy';

    // text
    node.querySelector('.product_name').textContent = item.title;
    node.querySelector('.product_price').textContent = formatPrice(item.price * qty);

    // quantity select
    const qtySelect = node.querySelector('.product_qty');
    qtySelect.value = String(qty);

    qtySelect.addEventListener('change', (e) => {
      const newQty = Number(e.target.value);
      updateCartItem(item.id, newQty);
    });

    // remove button
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

// ---------- update cart data ----------

function updateCartItem(id, quantity) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (!item) return;

  item.quantity = quantity;
  saveCart(cart);
  renderCart(); // re-render to update prices and totals
}

function removeCartItem(id) {
  let cart = getCart();
  cart = cart.filter(p => p.id !== id);
  saveCart(cart);
  renderCart();
}

// ---------- init ----------

document.addEventListener('DOMContentLoaded', renderCart);
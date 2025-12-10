import { getCart } from "./cartStorage.js";

export function getCartSubtotal() {
    const cart = getCart();
    if (!cart || cart.length === 0) return 0;

    // summer price * quantity for alle varer
    return cart.reduce((sum, item) => {
        const qty = item.quantity ?? 1;
        return sum + item.price * qty;
    }, 0);
}

export function formatPrice(amount) {
    return `${amount.toFixed(2)} €`;
}

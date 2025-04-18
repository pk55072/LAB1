// cart.js
window.getCart = function() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
};

window.setCart = function(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
};


window.renderCart = function() {
    const cart = getCart();
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';
    
    for (const id in cart) {
        const item = cart[id];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <button onclick="updateQuantity('${id}', -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateQuantity('${id}', 1)">+</button>
            </td>
        `;
        cartBody.appendChild(row);
    }
    
    updateCartBadges();
};

window.updateQuantity = function(id, change) {
    const cart = getCart();
    if (cart[id]) {
        cart[id].qty += change;
        if (cart[id].qty <= 0) {
            delete cart[id];
        }
        setCart(cart);
        renderCart();
    }
};

document.addEventListener('DOMContentLoaded', renderCart);
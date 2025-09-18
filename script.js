// Navigation toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if on products page
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
    
    alert(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    // Clear current cart display
    cartItems.innerHTML = '';
    
    let total = 0;
    
    // Add each item to cart display
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>${item.name} x${item.quantity}</div>
            <div>GHS ${itemTotal.toFixed(2)}</div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = `Total: GHS ${total.toFixed(2)}`;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Format message for WhatsApp
    let message = "Hello! I would like to order the following items from Shattys Collection:%0A%0A";
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.name} x${item.quantity} - GHS ${itemTotal.toFixed(2)}%0A`;
    });
    
    message += `%0ATotal: GHS ${total.toFixed(2)}%0A%0A`;
    message += "Please let me know how to proceed with payment and delivery. Thank you!";
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/233556129123?text=${message}`, '_blank');
    
    // Clear cart after checkout
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if on products page
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }
});
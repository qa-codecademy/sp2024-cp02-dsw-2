document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();

    const refreshButton = document.getElementById("refresh-button");
    if (refreshButton) {
        refreshButton.addEventListener("click", refreshCart);
    }
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total");
    cartItemsContainer.innerHTML = "";
    totalContainer.textContent = "";

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let totalSum = 0;
        cartItems.forEach(item => {
            const itemHTML = `
            <div class="cart-item">
            <button class="delete-btn" onclick="deleteCartItem(${item.id})">X</button>
            <div><img src="${item.imageUrl[0]}" alt="${item.name}"></div>
            <div><strong>Name:</strong> ${item.name}</div>
            <div><strong>Price:</strong> $${item.price.toFixed(2)}</div>
            <div class="quantity-section">
                <strong>Quantity:</strong>
                <button class="quantity-btn" onclick="decrementQuantity(${item.id})">-</button>
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button class="quantity-btn" onclick="incrementQuantity(${item.id})">+</button>
            </div>
        </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            totalSum += item.price * item.quantity;
        });

        totalContainer.textContent = `Total: $${totalSum.toFixed(2)}`;
    }
}

function deleteCartItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems();
}

function incrementQuantity(productId) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems();
    }
}

function decrementQuantity(productId) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems();
    }
}

function refreshCart() {
    localStorage.removeItem("cartItems");
    displayCartItems();
}
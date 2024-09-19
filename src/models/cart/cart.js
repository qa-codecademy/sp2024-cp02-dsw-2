document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();

    const proceedToPaymentButton = document.querySelector(".cart-total button");
    if (proceedToPaymentButton) {
        proceedToPaymentButton.addEventListener("click", () => {
            saveTotalsToLocalStorage();
        });
    }
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.querySelector(".cart-total-details:nth-of-type(1) p:last-of-type");
    const deliveryFeeElement = document.querySelector(".cart-total-details:nth-of-type(2) p:last-of-type");
    const totalElement = document.querySelector(".cart-total-details:nth-of-type(3) b:last-of-type");

    cartItemsContainer.innerHTML = "";
    subtotalElement.textContent = "$0.00";
    deliveryFeeElement.textContent = "$0.00";
    totalElement.textContent = "$0.00";

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let totalSum = 0;
        cartItems.forEach(item => {
            const itemHTML = `
            <div class="cart-items-title cart-items-item">
                <img src="${item.imageUrl[0]}" alt="${item.name}" />
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <p id="quantity-${item.id}">${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <p class="cross" onclick="deleteCartItem(${item.id})">X</p>
            </div>
            <hr />
            `;
            cartItemsContainer.innerHTML += itemHTML;
            totalSum += item.price * item.quantity;
        });

        const deliveryFee = totalSum === 0 ? 0 : 2;
        subtotalElement.textContent = `$${totalSum.toFixed(2)}`;
        deliveryFeeElement.textContent = `$${deliveryFee.toFixed(2)}`;
        totalElement.textContent = `$${(totalSum + deliveryFee).toFixed(2)}`;
    }
}

function saveTotalsToLocalStorage() {
    const subtotal = document.querySelector(".cart-total-details:nth-of-type(1) p:last-of-type").textContent;
    const deliveryFee = document.querySelector(".cart-total-details:nth-of-type(2) p:last-of-type").textContent;
    const total = document.querySelector(".cart-total-details:nth-of-type(3) b:last-of-type").textContent;
    localStorage.setItem("orderSubtotal", subtotal);
    localStorage.setItem("orderDeliveryFee", deliveryFee);
    localStorage.setItem("orderTotal", total);
}

function deleteCartItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems();
}

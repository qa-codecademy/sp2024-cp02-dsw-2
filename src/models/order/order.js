document.addEventListener("DOMContentLoaded", () => {
    const subtotalElement = document.querySelector(".cart-total-details:nth-of-type(1) p:last-of-type");
    const deliveryFeeElement = document.querySelector(".cart-total-details:nth-of-type(2) p:last-of-type");
    const totalElement = document.querySelector(".cart-total-details:nth-of-type(3) b:last-of-type");

    const subtotal = localStorage.getItem("orderSubtotal") || "$0.00";
    const deliveryFee = localStorage.getItem("orderDeliveryFee") || "$0.00";
    const total = localStorage.getItem("orderTotal") || "$0.00";

    subtotalElement.textContent = subtotal;
    deliveryFeeElement.textContent = deliveryFee;
    totalElement.textContent = total;
});

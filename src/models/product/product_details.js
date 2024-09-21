document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    let currentImageIndex = 0;

    if (productDetails) {
        // Set product title
        document.getElementById('product-title').textContent = productDetails.name;

        // Set main image and thumbnails
        const mainImage = document.getElementById('main-image');
        const thumbnailImages = document.querySelectorAll('.thumbnail');
        const desc = document.getElementById('product-description');
        const stockIcon = document.getElementById('stock-icon');
        const stockText = document.getElementById('stock-text');
        const addToCartButton = document.getElementById('add-to-cart');

        mainImage.src = productDetails.imageUrl[0];
        mainImage.alt = productDetails.name;

        thumbnailImages.forEach((thumbnail, index) => {
            if (productDetails.imageUrl[index]) {
                thumbnail.src = productDetails.imageUrl[index];
                thumbnail.alt = productDetails.name;
                thumbnail.style.display = 'block';
            } else {
                thumbnail.style.display = 'none';
            }

            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
                mainImage.alt = thumbnail.alt;

                thumbnailImages.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });

        // Arrow navigation functionality
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');

        prevArrow.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + productDetails.imageUrl.length) % productDetails.imageUrl.length;
            mainImage.src = productDetails.imageUrl[currentImageIndex];
            mainImage.alt = productDetails.name;
        });

        nextArrow.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % productDetails.imageUrl.length;
            mainImage.src = productDetails.imageUrl[currentImageIndex];
            mainImage.alt = productDetails.name;
        });

        // Handle price
        const priceContainer = document.getElementById('product-price');
        if (productDetails.isOnDiscount && productDetails.discountPrice > 0) {
            priceContainer.innerHTML = `
                <p class="text-danger"><strong>Discounted Price: $${productDetails.discountPrice.toFixed(2)}</strong></p>
                <p class="text-muted"><del>Regular Price: $${productDetails.price.toFixed(2)}</del></p>
            `;
        } else {
            priceContainer.innerHTML = `<p><strong>Price: $${productDetails.price.toFixed(2)}</strong></p>`;
        }

        // Set product description
        desc.textContent = productDetails.description || "No description available.";
        
        // Update stock status based on the stock count
        if (productDetails.stock === 0) {
            stockIcon.className = 'icon x-icon'; 
            stockText.textContent = 'Out of Stock';

            // Disable the add to cart button
            addToCartButton.disabled = true;
            addToCartButton.classList.add('disabled'); 
        } else {
            stockIcon.className = 'icon tick-icon'; 
            stockText.textContent = `In Stock `;

            // Enable the add to cart button if in stock
            addToCartButton.disabled = false;
            addToCartButton.classList.remove('disabled'); 
        }

        // Add to cart functionality
        addToCartButton.addEventListener('click', () => {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingProduct = cartItems.find(item => item.id === productDetails.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
                showCartPopup('Item is already in the cart.', false); 
            } else {
                productDetails.quantity = 1;
                cartItems.push(productDetails);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                showCartPopup('Item added to cart successfully!', true); 
            }
        });

    } else {
        console.error('No product details found in localStorage');
    }

    // Function to show the confirmation popup
    function showCartPopup(message, success) {
        const popup = document.getElementById('confirmation-popup');
        const popupContent = popup.querySelector('.confirmation-popup-content');
        const icon = popupContent.querySelector('i');
        const text = popupContent.querySelector('p');

        if (success) {
            icon.classList.remove('fa-times-circle');
            icon.classList.add('fa-check-circle');
            icon.style.color = 'green';
        } else {
            icon.classList.remove('fa-check-circle');
            icon.classList.add('fa-times-circle');
            icon.style.color = 'red';
        }

        text.textContent = message;
        popup.style.display = 'flex';
    }

    // Function to hide the confirmation popup
    window.hideConfirmationPopup = function() {
        const popup = document.getElementById('confirmation-popup');
        popup.style.display = 'none';
    }
});

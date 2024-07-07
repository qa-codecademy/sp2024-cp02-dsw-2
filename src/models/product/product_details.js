document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    console.log('Product details from localStorage:', productDetails);
    
    if (productDetails) {
        document.getElementById('product-title').textContent = productDetails.name;

        const mainImage = document.getElementById('main-image');
        mainImage.src = productDetails.imageUrl[0]; // Display the first image 
        mainImage.alt = productDetails.name;

        const thumbnailImages = document.querySelectorAll('.thumbnail');
        thumbnailImages.forEach((thumbnail, index) => {
            if (productDetails.imageUrl[index]) {
                thumbnail.src = productDetails.imageUrl[index]; 
                thumbnail.alt = productDetails.name;
            } else {
                thumbnail.style.display = 'none'; // Hide thumbnails if image URL is not provided
            }

            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src; // Swap main image with clicked thumbnail
                mainImage.alt = thumbnail.alt;

                // Adjust CSS for active thumbnail appearance
                thumbnailImages.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });

        const priceContainer = document.getElementById('product-price');
        if (productDetails.isOnDiscount && productDetails.discountPrice > 0) {
            priceContainer.innerHTML = `
                <p class="text-danger"><strong>Discounted Price: $${productDetails.discountPrice.toFixed(2)}</strong></p>
                <p class="text-muted"><del>Regular Price: $${productDetails.price.toFixed(2)}</del></p>
            `;
        } else {
            priceContainer.innerHTML = `<p><strong>Price: $${productDetails.price.toFixed(2)}</strong></p>`;
        }

       

    } else {
        console.error('No product details found in localStorage');
    }
});
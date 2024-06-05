
document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    console.log('Product details from localStorage:', productDetails);
    if (productDetails) {
        document.getElementById('product-title').textContent = productDetails.name;
        document.getElementById('product-description').textContent = productDetails.description;

        const productImagesContainer = document.getElementById('product-images');
        productDetails.detailsImages.forEach(image => {
            console.log('Adding image:',image);
            const imgElement = document.createElement('img');
            imgElement.src = image;

            imgElement.alt = productDetails.name;
            imgElement.classList.add('img-fluid', 'mb-2'); 
            productImagesContainer.appendChild(imgElement);
        });
    } else {
        console.error('No product details found in localStorage');
    }
});

fetch('assets/data/products.json')
  .then(response => response.json())
  .then(data => {
    const productGrid = document.getElementById('product-grid');
    data.forEach(product => {
        const productHTML = `
        <div class="col-md-5th">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">Details</button>
                </div>
            </div>
        </div>`;
        productGrid.innerHTML += productHTML;
    });
  })
  .catch(error => console.error('Error fetching products:', error));

function viewProductDetails(productId) {
    fetch('assets/data/products.json')
      .then(response => response.json())
      .then(data => {
        const product = data.find(p => p.id === productId);
        if (product) {
            localStorage.setItem('productDetails', JSON.stringify(product));
            console.log('Product stored in localStorage:', localStorage.getItem('productDetails')); 
            window.location.href = 'product_details.html';
        } else {
            console.error('Product not found');
        }
      })
      .catch(error => console.error('Error fetching product details:', error));
}




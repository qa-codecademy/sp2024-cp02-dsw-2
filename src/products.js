fetch('assets/data/products.json')
  .then(response => response.json())
  .then(products => {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productHTML = `
        <div class="col-md-5th">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="product_details.html?id=${product.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`;
        productGrid.innerHTML += productHTML;
    });
  })
  .catch(error => console.error('Error fetching products:', error));

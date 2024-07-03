// imame vo kodov tri glavni funkcii: vcituvanje na podatoci od JSON fajl, filtriranje na podatoci po category i prikazuvanje na detalite na prozivotot

// listener za nastani koje se aktivira koga dokumentot kje se vcita celosno
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);//window.location.search ja kreira urlParams objekt sto gi sodrzi parametrite na URL-to
    const category = urlParams.get('category');
    console.log('Category:', category);

    if (category) {
        fetchProductsByCategory(category);
    } else {
        fetchProducts();
    }
});

function fetchProductsByCategory(category) { // ovaa funkcija  gi vcituva i filtrira proizvodi spored kategoriajta
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            console.log('All Products:', data);
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';

            const filteredProducts = data.filter(product => product.category.toLowerCase() === category.toLowerCase());
            console.log('Filtered Products:', filteredProducts);
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => {
                    const productHTML = `
                    <div class="col-md-5th">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Price: $${product.price.toFixed(2)}</strong></p>
                                ${product.isOnDiscount ? '<img src="assets/data/images/download.png" alt="Sale" class="sale-icon">' : ''}
                                <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">Details</button>
                            </div>
                        </div>
                    </div>`;
                    productGrid.innerHTML += productHTML;
                });
            } else {
                productGrid.innerHTML = '<p>No products found in this category.</p>';
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

function fetchProducts() {//ova fukcija gi vcituva i prikazuva site produkti , kako predhodnata samo bez filter 
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = '';

            data.forEach(product => {
                const productHTML = `
                <div class="col-md-5th">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                             <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Price: $${product.price.toFixed(2)}</strong></p>
                             ${product.isOnDiscount ? '<img src="assets/data/images/download.png>' : ''}

                            <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">Details</button>
                        </div>
                    </div>
                </div>`;
                productGrid.innerHTML += productHTML;
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function viewProductDetails(productId) {// gi prikkzuva detali za izbran prozivod
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            const product = data.find(p => p.id === productId);// kje go najde po id produktot
            if (product) {
                localStorage.setItem('productDetails', JSON.stringify(product));// gi zacuvuva detalite za prozivodot vo local storage
                window.location.href = 'product_details.html'; //ovde prenasocuva na stanicata product_details.html
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
}


//kodov : vcituva i prikazuva podatoci spored kategoriajta ili site proizvodi, 
//        prikazuva detali za proizvodite
//        koristi lokal storage za da gi zacuva informaciite
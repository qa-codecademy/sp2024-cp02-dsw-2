document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");
  console.log("Category:", categoryParam);

  // Fetch all products initially
  fetchProducts();

  // Set the initial category selection
  if (categoryParam) {
      document.getElementById('category-select').value = categoryParam;
      filterProductsByCategory(categoryParam);
  }

  // Event listener for category selection change
  document.getElementById('category-select').addEventListener('change', function() {
      const selectedCategory = this.value.toLowerCase();
      filterProductsByCategory(selectedCategory);
  });

  // Event listener for discount filter
  document.getElementById('discount-checkbox').addEventListener('change', function() {
      filterProductsByCategory(document.getElementById('category-select').value.toLowerCase());
  });

  // Event listener for search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
      filterProductsByCategory(document.getElementById('category-select').value.toLowerCase());
  });

  // Event listener for sort select
  document.getElementById('sort-select').addEventListener('change', function() {
      filterProductsByCategory(document.getElementById('category-select').value.toLowerCase());
  });

  const filters = document.querySelector('.filters');
  const toggleButton = document.getElementById('open-filters-btn');
  const closeButton = document.getElementById('close-filters-btn');

  // Function to toggle no-scroll class on body
  const toggleScrollLock = () => {
      document.body.classList.toggle('no-scroll');
  };

  // Event listener for opening filters
  toggleButton.addEventListener('click', () => {
      filters.classList.remove('collapsed');
      toggleButton.style.display = 'none';
      closeButton.style.display = 'block';
      toggleScrollLock(); 
  });

  // Event listener for closing filters
  closeButton.addEventListener('click', () => {
      filters.classList.add('collapsed');
      toggleButton.style.display = 'block';
      closeButton.style.display = 'none';
      toggleScrollLock(); 
  });

});

// Function to fetch all products
function fetchProducts() {
  fetch("/src/assets/data/products.json")
      .then(response => response.json())
      .then(data => renderProducts(data.products))
      .catch(error => console.error("Error fetching products:", error));
}

// Function to filter and render products by category
function filterProductsByCategory(category) {
  fetch("/src/assets/data/products.json")
      .then(response => response.json())
      .then(data => {
          let filteredProducts = data.products.filter(product => {
              return category === 'all' || product.category.toLowerCase() === category.toLowerCase();
          });

          // discount filter if checked
          if (document.getElementById('discount-checkbox').checked) {
              filteredProducts = applyDiscountFilter(filteredProducts);
          }

          // search filter
          const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
          if (searchTerm !== '') {
              filteredProducts = filteredProducts.filter(product =>
                  product.name.toLowerCase().includes(searchTerm)
              );
          }

          // sort filter
          const sortBy = document.getElementById('sort-select').value;
          if (sortBy === 'cheapest') {
              filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          } else if (sortBy === 'expensive') {
              filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          }

          renderProducts(filteredProducts);
      })
      .catch(error => console.error("Error fetching products:", error));
}

// Function to apply discount filter
function applyDiscountFilter(products) {
  return products.filter(product => product.isOnDiscount === true);
}

// Function to render products on the page
function renderProducts(products) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";

  if (products.length > 0) {
      products.forEach(product => {
          let priceToShow = product.price; // Default to regular price
          let priceHTML = `<strong>Price: $${priceToShow.toFixed(2)}</strong>`;

          if (document.getElementById('discount-checkbox').checked && product.isOnDiscount) {
              // Show discounted price with strikethrough
              priceToShow = product.discountPrice;
              priceHTML = `
                  <strong>Price: <del>$${product.price.toFixed(2)}</del> <br /> Discount Price: $${priceToShow.toFixed(2)}</strong>
              `;
          }

          const productHTML = `
              <div class="col-md-4 mb-4">
                  <div class="card">
                      <img src="${product.imageUrl[0]}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description}</p>
                          <p class="card-text">${priceHTML}</p>
                          <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">Details</button>
                      </div>
                  </div>
              </div>`;
          productGrid.innerHTML += productHTML;
      });
  } else {
      productGrid.innerHTML = "<p>No products found matching the filters.</p>";
  }
}


// Function to view product details
function viewProductDetails(productId) {
  fetch("/src/assets/data/products.json")
      .then(response => response.json())
      .then(data => {
          const product = data.products.find(p => p.id === productId);
          if (product) {
              localStorage.setItem("productDetails", JSON.stringify(product));
              window.location.href = "/src/templates/product_details.html";
          } else {
              console.error("Product not found");
          }
      })
      .catch(error => console.error("Error fetching product details:", error));
}
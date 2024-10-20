document.addEventListener('DOMContentLoaded', function () {
    const itemCards = document.querySelector('.item-cards');
    const itemCardsContainer = document.querySelector('.item-cards-container');
    const discountCheckbox = document.getElementById('discountCheckbox');
    const inStockCheckbox = document.getElementById('inStockCheckbox');
    const outOfStockCheckbox = document.getElementById('outOfStockCheckbox');
    const priceCheckboxes = document.querySelectorAll('input[name="priceRange"]'); // Checkbox group for price ranges
    const sortSelect = document.getElementById('sortSelect');

    // Variables for pagination
    let currentIndex = 0;
    const itemsPerPage = 10;
    let isLoading = false;
    let allProducts = [];
    let productsFetched = false; // Flag to track if products are already fetched

    // Fetch products from JSON file
    function fetchProducts() {
        if (productsFetched) return; // Return if already fetched

        fetch("/src/assets/data/products.json")
            .then(response => response.json())
            .then(data => {
                allProducts = data.products;
                productsFetched = true; // Set flag to true after fetching
                const categoryParam = new URLSearchParams(window.location.search).get("category") || 'all';
                renderItems(categoryParam);
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Render products based on category, filters, and pagination
    function renderItems(category) {
        const showDiscountOnly = discountCheckbox && discountCheckbox.checked;
        const showInStockOnly = inStockCheckbox.checked;
        const showOutOfStockOnly = outOfStockCheckbox.checked;

        // Filter products
        let filteredProducts = allProducts.filter(product => {
            const isDiscounted = !showDiscountOnly || product.discountPrice;
            const isInStock = !showInStockOnly || product.stock > 0;
            const isOutOfStock = !showOutOfStockOnly || product.stock === 0;
            const isInPriceRange = handlePriceFilter(product);

            return (category === 'all' || product.category.toLowerCase() === category.toLowerCase()) &&
                isDiscounted &&
                isInStock &&
                isOutOfStock &&
                isInPriceRange;
        });

        // Sort products
        const sortOption = sortSelect ? sortSelect.value : '';
        filteredProducts = sortProducts(filteredProducts, sortOption);

        // Clear existing items
        itemCards.innerHTML = '';
        currentIndex = 0;  // Reset pagination

        // Function to render current set of items
        function renderCurrentItems() {
            for (let i = currentIndex; i < currentIndex + itemsPerPage && i < filteredProducts.length; i++) {
                const item = filteredProducts[i];
                const itemCard = document.createElement('div');
                itemCard.classList.add('item-card');

                itemCard.innerHTML = `
                    <img src="${item.imageUrl[0]}" class="item-img" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <div class="price-content">
                        <p class="price original-price" style="${item.discountPrice ? '' : 'display:none;'}">$${item.price}</p>
                        <p class="price discount-price" style="${item.discountPrice ? '' : 'display:none;'}">$${item.discountPrice}</p>
                        <p class="price" style="${!item.discountPrice ? '' : 'display:none;'}">$${item.price}</p>
                    </div>
                    <div class="buttons">
                        <button class="btn-details" onclick="viewProductDetails(${item.id})">View Details</button>
                        <button class="btn-buy ${item.stock === 0 ? 'disabled' : ''}" onclick="${item.stock === 0 ? '' : `addToCart(${item.id})`}">${item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</button>
                    </div>
                `;
                itemCards.appendChild(itemCard);
            }
            currentIndex += itemsPerPage;
            isLoading = false;
        }

        renderCurrentItems();

        // Infinite scroll logic
        window.addEventListener('scroll', function () {
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

            if (nearBottom && currentIndex < filteredProducts.length && !isLoading) {
                isLoading = true;

                // Display "Loading more items..." message
                const loadingDiv = document.createElement('div');
                loadingDiv.classList.add('loading');
                loadingDiv.innerText = 'Loading more items...';
                itemCardsContainer.appendChild(loadingDiv);

                setTimeout(() => {
                    loadingDiv.remove();
                    renderCurrentItems();
                }, 1000); // 1 second delay for loading effect
            }
        });
    }

    // Handle price filtering
    function handlePriceFilter(product) {
        let priceRangeSelected = false;
        let isInRange = false; // Track if the product is within the selected range

        priceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                priceRangeSelected = true; // At least one checkbox is checked
                const price = product.discountPrice || product.price; // Use discounted price if available
                switch (checkbox.value) {
                    case '0-1000':
                        if (price <= 1000) isInRange = true;
                        break;
                    case '1000-3000':
                        if (price > 1000 && price <= 3000) isInRange = true;
                        break;
                    case '3000+':
                        if (price > 3000) isInRange = true;
                        break;
                }
            }
        });

        return priceRangeSelected ? isInRange : true; // If no checkboxes are checked, show all products
    }

    // Sort products based on selected option
    function sortProducts(products, sortOption) {
        switch (sortOption) {
            case 'price-asc':
                return products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            case 'price-desc':
                return products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            case 'name-asc':
                return products.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return products.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return products;
        }
    }

    // Handle checkbox changes and re-render products
    discountCheckbox?.addEventListener('change', () => renderItems(getCurrentCategory()));
    inStockCheckbox.addEventListener('change', handleStockFilterChange);
    outOfStockCheckbox.addEventListener('change', handleStockFilterChange);
    
    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Uncheck all other checkboxes
            priceCheckboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) otherCheckbox.checked = false;
            });
            renderItems(getCurrentCategory()); // Re-render on price checkbox change
        });
    });

    sortSelect?.addEventListener('change', () => renderItems(getCurrentCategory()));

    // Handle category selection via <li> elements
    const categoryItems = document.querySelectorAll('.category-list li');
    categoryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const selectedCategory = this.getAttribute('data-value');
            if (selectedCategory) {
                window.location.href = `/src/templates/products.html?category=${selectedCategory}`;
            }
        });
    });

    // Handle stock filter change
    function handleStockFilterChange() {
        if (inStockCheckbox.checked) outOfStockCheckbox.checked = false;
        if (outOfStockCheckbox.checked) inStockCheckbox.checked = false;
        renderItems(getCurrentCategory());
    }

    // Get current category from URL
    function getCurrentCategory() {
        return new URLSearchParams(window.location.search).get('category') || 'all';
    }

    // View product details and redirect to details page
    window.viewProductDetails = function (productId) {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            localStorage.setItem("productDetails", JSON.stringify(product));
            window.location.href = "/src/templates/product_details.html";
        }
    };

    // Add product to cart
    window.addToCart = function (productId) {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            const existingItem = cartItems.find(item => item.id === productId);
            if (existingItem) {
                showCartPopup('Item is already in cart', false);
            } else {
                product.quantity = 1;
                cartItems.push(product);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                showCartPopup('Item added to cart successfully!', true);
            }
        }
    };

    fetchProducts(); // Initial fetch call
});

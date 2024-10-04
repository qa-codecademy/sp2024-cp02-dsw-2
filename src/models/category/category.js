document.addEventListener("DOMContentLoaded", function () {
  const filterToggle = document.getElementById("filterToggle");
  const filters = document.querySelector(".filters");
  const itemCards = document.querySelector(".item-cards");
  const itemCardsContainer = document.querySelector(".item-cards-container");
  const discountCheckbox = document.getElementById("discountCheckbox");
  const sortSelect = document.getElementById("sortSelect");
  const categorySelect = document.getElementById("categorySelect");
  const inStockCheckbox = document.getElementById("inStockCheckbox");
  const outOfStockCheckbox = document.getElementById("outOfStockCheckbox");
  const filterHeader = document.getElementById("filterHeader");
  const filterContent = document.getElementById("filterContent");
  const arrowIcon = document.getElementById("arrowIcon");

  // Variables for pagination
  let currentIndex = 0;
  const itemsPerPage = 10;
  let isLoading = false;
  let allProducts = [];

  // Function to fetch products from JSON file
  function fetchProducts() {
    fetch("/src/assets/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data.products;
        const categoryParam =
          new URLSearchParams(window.location.search).get("category") || "all";
        renderItems(categoryParam);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Function to render products
  function renderItems(category) {
    // Get the state of the filters
    const showDiscountOnly = discountCheckbox.checked;
    const showInStockOnly = inStockCheckbox.checked;
    const showOutOfStockOnly = outOfStockCheckbox.checked;

    // Filter products by category, discount, and availability
    let filteredProducts = allProducts.filter((product) => {
      return (
        (category === "all" ||
          product.category.toLowerCase() === category.toLowerCase()) &&
        (!showDiscountOnly || product.discountPrice) &&
        (!showInStockOnly || product.stock > 0) &&
        (!showOutOfStockOnly || product.stock === 0)
      );
    });

    // Sort products based on selected option
    const sortOption = sortSelect.value;
    filteredProducts = sortProducts(filteredProducts, sortOption);

    // Clear existing items
    itemCards.innerHTML = "";

    // Reset pagination
    currentIndex = 0;

    // Initial render of items
    function renderCurrentItems() {
      for (
        let i = currentIndex;
        i < currentIndex + itemsPerPage && i < filteredProducts.length;
        i++
      ) {
        const item = filteredProducts[i];
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");

        itemCard.innerHTML = `
                    <img src="${item.imageUrl[0]}" class="item-img" alt="${
          item.name
        }">
                    <h3>${item.name}</h3>
                    <div class="price-content">
                        <p class="price original-price" style="${
                          item.discountPrice ? "" : "display:none;"
                        }">$${item.price}</p>
                        <p class="price discount-price" style="${
                          item.discountPrice ? "" : "display:none;"
                        }">$${item.discountPrice}</p>
                        <p class="price" style="${
                          !item.discountPrice ? "" : "display:none;"
                        }">$${item.price}</p>
                    </div>
                    <div class="buttons">
                        <button class="btn-details" onclick="viewProductDetails(${
                          item.id
                        })">View Details</button>
                        <button class="btn-buy ${
                          item.stock === 0 ? "disabled" : ""
                        }" onclick="${
          item.stock === 0 ? "" : `addToCart(${item.id})`
        }">${item.stock === 0 ? "Out of Stock" : "Add to Cart"}</button>
                    </div>
                `;
        itemCards.appendChild(itemCard);
      }
      currentIndex += itemsPerPage;
      isLoading = false;
    }

    renderCurrentItems();

    // Infinite scroll logic
    window.addEventListener("scroll", function () {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (nearBottom && currentIndex < filteredProducts.length && !isLoading) {
        isLoading = true;

        // Display Loading... message in the item cards container
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("loading");
        loadingDiv.innerText = "Loading more items...";
        itemCardsContainer.appendChild(loadingDiv);

        // Load more items after 1 second delay
        setTimeout(function () {
          loadingDiv.remove();
          renderCurrentItems();
        }, 1000);
      }
    });
  }

  // Function to sort products based on the selected option
  function sortProducts(products, sortOption) {
    switch (sortOption) {
      case "price-asc":
        return products.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
      case "price-desc":
        return products.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
      case "name-asc":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }

  // Event listener for discount checkbox
  discountCheckbox.addEventListener("change", function () {
    const categoryParam =
      new URLSearchParams(window.location.search).get("category") || "all";
    renderItems(categoryParam);
  });

  // Event listener for sort select
  sortSelect.addEventListener("change", function () {
    const categoryParam =
      new URLSearchParams(window.location.search).get("category") || "all";
    renderItems(categoryParam);
  });

  // Event listener for category select
  categorySelect.addEventListener("change", function () {
    const selectedCategory = categorySelect.value;
    if (selectedCategory) {
      window.location.href = `/src/templates/products.html?category=${selectedCategory}`;
    }
  });

  // Event listener for in-stock checkbox
  inStockCheckbox.addEventListener("change", function () {
    if (inStockCheckbox.checked) {
      outOfStockCheckbox.checked = false;
    }
    renderItems(
      new URLSearchParams(window.location.search).get("category") || "all"
    );
  });

  // Event listener for out-of-stock checkbox
  outOfStockCheckbox.addEventListener("change", function () {
    if (outOfStockCheckbox.checked) {
      inStockCheckbox.checked = false;
    }
    renderItems(
      new URLSearchParams(window.location.search).get("category") || "all"
    );
  });

  // close open filter section
  filterHeader.addEventListener("click", function () {
    const isContentVisible = filterContent.style.display === "block";

    if (isContentVisible) {
      filterContent.style.display = "none";
      arrowIcon.classList.remove("arrow-up");
    } else {
      filterContent.style.display = "block";
      arrowIcon.classList.add("arrow-up");
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");
  if (categoryParam) {
    categorySelect.value = categoryParam;
  }

  // Function to view product details
  window.viewProductDetails = function (productId) {
    fetch("/src/assets/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.products.find((p) => p.id === productId);
        if (product) {
          localStorage.setItem("productDetails", JSON.stringify(product));
          window.location.href = "/src/templates/product_details.html";
        } else {
          console.error("Product not found for productId:", productId);
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  // Function to add product to cart
  window.addToCart = function (productId) {
    fetch("/src/assets/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const product = data.products.find((p) => p.id === productId);
        if (product) {
          let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          const existingItemIndex = cartItems.findIndex(
            (item) => item.id === productId
          );

          if (existingItemIndex !== -1) {
            // Item already in cart
            showCartPopup("Item is already in cart", false); // Show popup with X icon
          } else {
            // Item not in cart, add it
            product.quantity = 1;
            cartItems.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            showCartPopup("Item added to cart successfully!", true); // Show popup with check icon
          }
        } else {
          console.error("Product not found for productId:", productId);
        }
      })
      .catch((error) => console.error("Error adding product to cart:", error));
  };

  // Function to show the confirmation popup
  function showCartPopup(message, success) {
    const popup = document.getElementById("confirmation-popup");
    const popupContent = popup.querySelector(".confirmation-popup-content");
    const icon = popupContent.querySelector("i");
    const text = popupContent.querySelector("p");

    if (success) {
      icon.classList.remove("fa-times-circle");
      icon.classList.add("fa-check-circle");
      icon.style.color = "green";
    } else {
      icon.classList.remove("fa-check-circle");
      icon.classList.add("fa-times-circle");
      icon.style.color = "red";
    }

    text.textContent = message;
    popup.style.display = "flex";
  }

  // Function to hide the confirmation popup
  window.hideConfirmationPopup = function () {
    const popup = document.getElementById("confirmation-popup");
    popup.style.display = "none";
  };

  // Initial fetch and render
  fetchProducts();
});

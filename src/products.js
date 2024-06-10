document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  console.log("Category:", category);

  if (category) {
    fetchProductsByCategory(category);
  } else {
    fetchProducts();
  }
});

function fetchProductsByCategory(category) {
  fetch("assets/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("All Products:", data);
      const productGrid = document.getElementById("product-grid");
      productGrid.innerHTML = "";

      const filteredProducts = data.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      console.log("Filtered Products:", filteredProducts);
      if (filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
          const productHTML = `
                    <div class="col-md-5th">
                        <div class="card">
                            <img src="${
                              product.image
                            }" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>Price: $${product.price.toFixed(
                                  2
                                )}</strong></p>
                                ${
                                  product.isOnDiscount
                                    ? '<img src="assets/data/images/download.png" alt="Sale" class="sale-icon">'
                                    : ""
                                }
                                <button class="btn btn-primary" onclick="viewProductDetails(${
                                  product.id
                                })">Details</button>
                            </div>
                        </div>
                    </div>`;
          productGrid.innerHTML += productHTML;
        });
      } else {
        productGrid.innerHTML = "<p>No products found in this category.</p>";
      }
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function fetchProducts() {
  fetch("assets/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const productGrid = document.getElementById("product-grid");
      productGrid.innerHTML = "";

      data.forEach((product) => {
        const productHTML = `
                <div class="col-md-5th">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${
          product.name
        }">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                             <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>Price: $${product.price.toFixed(
                              2
                            )}
                        </div>
                    </div>
                </div>`;
        productGrid.innerHTML += productHTML;
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function viewProductDetails(productId) {
  fetch("assets/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.find((p) => p.id === productId);
      if (product) {
        localStorage.setItem("productDetails", JSON.stringify(product));
        window.location.href = "product_details.html";
      } else {
        console.error("Product not found");
      }
    })
    .catch((error) => console.error("Error fetching product details:", error));
}

const productsContainerEl = document.querySelector(".product-container");
const loadButton = document.querySelector(".loadingProducts");

const localProductsStorage = "/assets/data/products.json";

async function fetchProductsAndPutInLocalStorage() {
  try {
    const res = await fetch(localProductsStorage);
    const data = await res.json();
    localStorage.setItem("localProducts", JSON.stringify(data));
    renderProductsList(productsContainerEl, data);
  } catch (error) {
    console.error("failing to fetch ur products", error);
  }
}

function renderProductsList(productsContainerEl, productsData) {
  const productsArray = productsData.products;
  let productsHTML = "";

  productsArray.forEach((products) => {
    productsHTML += ` <div class="product-card">
         <h3>${products.id}. ${products.name}</h3>
         <img src="${products.image}" alt="" />
         <h4>Price: $${products.price}</h4>
         <h4>Category: ${products.category}</h4>
      </div>`;
  });

  productsContainerEl.innerHTML = productsHTML;
}

if (localStorage.getItem("localProducts")) {
  const productsData = JSON.parse(localStorage.getItem("localProducts"));
  renderProductsList(productsContainerEl, productsData);
} else {
  fetchProductsAndPutInLocalStorage(); 
}

if (loadButton) {
  loadButton.addEventListener("click", fetchProductsAndPutInLocalStorage);
} else {
  console.error("Load button element not found");
}

console.log(loadButton);

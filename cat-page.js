const productsContainerEl = document.querySelector(".products-container");
const loadButton = document.querySelector(".loadingProducts");

const localProductsStorage = "./src/assets/data/products.json";

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

function renderProductsList(containerEl, productsData) {
  let productsHTML = "";

  for (let products of productsData) {
    productsHTML += `
    <div class="product-card">
      <h3>${products.id}. ${products.name}</h3>
      <img src="${products.image}" alt="" />
      <h4>Price: $${products.price}</h4>
      <h4>Category: ${products.category}</h4>
    </div>
    `;
  }

  containerEl.innerHTML = productsHTML;

  loadButton.addEventListener("click", () => fetchProductsAndPutInLocalStorage);

  if (localStorage.getItem("localProducts")) {
    const productsInStorage = JSON.parse(localStorage.getItem("localProducts"));
    renderProductsList(productsContainerEl, productsInStorage);
  } else {
    fetchProductsAndPutInLocalStorage();
  }
}

console.log(localProductsStorage);
console.log(loadButton);

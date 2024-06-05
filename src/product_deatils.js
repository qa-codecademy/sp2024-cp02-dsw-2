function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");
    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

const params = getQueryParams();
const productId = params['id'];
console.log('Product ID:', productId);

fetch('assets/data/products.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;
    const product = products.find(p => p.id == productId);
    if (product) {
        console.log('Product found:', product);
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;

        const productImagesContainer = document.getElementById('product-images');
        product.detailsImages.forEach(image => {
            console.log('Adding image:', image);
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = product.name;
            productImagesContainer.appendChild(imgElement);
        });
    } else {
        console.error('Product not found');
    }
  })
  .catch(error => console.error('Error fetching product details:', error));

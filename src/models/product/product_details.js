document.addEventListener('DOMContentLoaded', () => {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));// funkcijava gi prezema i parsira podatocite za productot od locale storage
    console.log('Product details from localStorage:', productDetails);
    if (productDetails) {
        document.getElementById('product-title').textContent = productDetails.name;
        document.getElementById('product-description').textContent = productDetails.description;
        //ovde se postavuvaat imeto i opisot vo elementite so soodvetnoto id
        

        const productImagesContainer = document.getElementById('product-images');//dodavenje na slikite od produktot
        productDetails.detailsImages.forEach(image => {
            console.log('Adding image:', image);
            const imgElement = document.createElement('img');// kreiram elemeent img 
            imgElement.src = image;// ovde se postavuva url na slikata 
            imgElement.alt = productDetails.name;
            imgElement.classList.add('img-fluid', 'mb-2'); //css klasa za elementot vo containerot 
            productImagesContainer.appendChild(imgElement);// se apendira img elementot na konejnerot 
        });


        //proverka dali proizvodot e na popust 
        const priceContainer = document.getElementById('product-price');
        if (productDetails.isOnDiscount) {
            const discountedPrice = productDetails.price * 0.9; //presmetka za namaleno cena 10%
            //se prikazuva namelenata i redovnata cena so precrtuvanje
            priceContainer.innerHTML = `
                <p class="text-danger"><strong>Discounted Price: $${discountedPrice.toFixed(2)}</strong></p>
                <p class="text-muted"><del>Regular Price: $${productDetails.price.toFixed(2)}</del></p>
            `;
        } else {
            //se prikazuva redovnata cena 
            priceContainer.innerHTML = `<p><strong>Price: $${productDetails.price.toFixed(2)}</strong></p>`;
        }
    } else {
        console.error('No product details found in localStorage');
    }
});

//vo uslovot se prikazuva: ako produktot e  na popust namlenata cena i redovnata cena precrtana, 
//ako ne prikaz na redovnata 
//ako ne error vo consola 

//e sega ovoj kod e vekje vo cart i order , taka da ako vi se dopagja koj go raboti moze da prodolzi ili da go izmeni
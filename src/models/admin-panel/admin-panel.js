
// Function to dynamically show content based on selection
function showContent(option) {
    const dynamicContent = document.getElementById('dynamic-content');
    let tableContent = '';
    
    switch (option) {
        case 'category':
            tableContent = `
                <h2>Categories</h2>
                <button onclick="showPopup('category')">Add New Category</button>
                <div class="table-wrapper">
                    <table id="posts">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Image URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Electronics</td>
                                <td>https://example.com/electronics.jpg</td>
                                <td>
                                    <button>
                                        <i class="fas fa-trash-alt"></i>
                                    </button> | 
                                    <button>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'product':
            tableContent = `
                <h2>Products</h2>
                <button onclick="showPopup('product')">Add New Product</button>
                <div class="table-wrapper">
                    <table id="posts">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>On Discount</th>
                                <th>Discount Price</th>
                                <th>Quantity</th>
                                <th>Image URLs</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Smartphone</td>
                                <td>Latest model</td>
                                <td>$699</td>
                                <td>No</td>
                                <td></td>
                                <td>50</td>
                                <td>/image1.jpg, </br> /image2.jpg, </br> /image3.jpg</td>
                                <td>
                                    <button>
                                        <i class="fas fa-trash-alt"></i>
                                    </button> | 
                                    <button>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'user':
            tableContent = `
                <h2>Users</h2>
                <button onclick="showPopup('user')">Add New User</button>
                <div class="table-wrapper">
                    <table id="posts">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Profile Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>https://example.com/johndoe.jpg</td>
                                <td>
                                    <button>
                                        <i class="fas fa-trash-alt"></i>
                                    </button> | 
                                    <button>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'inbox':
            tableContent = `
                <h2>Inbox</h2>
                <div class="table-wrapper">
                    <table id="posts">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jane Smith</td>
                                <td>jane@example.com</td>
                                <td>Hello, I have an inquiry.</td>
                                <td>
                                    <button>
                                        <i class="fas fa-trash-alt"></i>
                                    </button> | 
                                    <button>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            break;
        default:
            tableContent = '';
    }

    dynamicContent.innerHTML = tableContent;
}


// Function to show popup modal
function showPopup(option) {
    const modal = document.getElementById('popup-modal');
    const popupTitle = document.getElementById('popup-title');
    const popupBody = document.getElementById('popup-body');
    
    modal.style.display = 'flex';
    
    switch (option) {
        case 'category':
            popupTitle.innerText = 'Add New Category';
            popupBody.innerHTML = `
                <input placeholder="Category Name" type="text" id="category-name">
                <input placeholder="Category Image" type="text" id="category-image">
            `;
            break;
        case 'product':
            popupTitle.innerText = 'Add New Product';
            popupBody.innerHTML = `
                <input placeholder="Name" type="text" id="product-name">
                <textarea placeholder="Description" id="product-description"></textarea>
                <input placeholder="Price" type="number" id="product-price">
                <div class="checkbox-container">
                    <label for="myCheckbox">On Disscount</label>    
                    <input type="checkbox" id="on-discount" onclick="toggleDiscountInput()">
                </div>
                
                <div id="discount-price-container" style="display:none;">
                    <input placeholder="Disscounted Price" type="number" id="discount-price">
                </div>
                <input placeholder="Quantity" type="number" id="quantity">
                <input placeholder="Image 1" type="text" id="product-image1">
                <input placeholder="Image 2" id="product-image2">
                <input placeholder="Image 3" id="product-image3">
            `;
            break;
        case 'user':
            popupTitle.innerText = 'Add New User';
            popupBody.innerHTML = `
                <input placeholder="Username" type="text" id="user-name">
                <input placeholder="email" type="email" id="user-email">
                <input placeholder="Profile Picture" type="text" id="user-image">
            `;
            break;
        default:
            popupTitle.innerText = '';
            popupBody.innerHTML = '';
    }
}

// Function to close the popup modal
function closePopup() {
    const modal = document.getElementById('popup-modal');
    modal.style.display = 'none';
}

// Function to toggle discount input visibility
function toggleDiscountInput() {
    const discountContainer = document.getElementById('discount-price-container');
    discountContainer.style.display = discountContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to submit the form (implementation can be updated)
function submitForm() {
    alert('Form submitted!');
    closePopup();
}


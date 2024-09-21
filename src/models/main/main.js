

// Show the login popup
function showLoginPopup() {
    document.getElementById("login-popup").style.display = "flex";
}

// Hide the login popup
function hideLoginPopup() {
    document.getElementById("login-popup").style.display = "none";
}

// Toggle between Login and Sign Up states
function toggleLoginState() {
    const title = document.getElementById("popup-title");
    const toggleState = document.getElementById("toggle-state");
    const nameInput = document.getElementById("name");
    
    if (title.textContent === "Login") {
        title.textContent = "Sign Up";
        toggleState.innerHTML = 'Already have an account? <span onclick="toggleLoginState()">Login here</span>';
        nameInput.style.display = 'block';
    } else {
        title.textContent = "Login";
        toggleState.innerHTML = 'Create a new account <span onclick="toggleLoginState()">Click here</span>';
        nameInput.style.display = 'none';
    }
}

// mock data
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        id: 3,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    }
];

let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// Handle user login
function onLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Find the user by email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        loggedInUser = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save to localStorage
        hideLoginPopup();
        updateNavbarForUser(user);
    } else {
        alert('Invalid email or password.');
    }
}

// Update the navbar depending on the logged-in user
function updateNavbarForUser(user) {
    const loginIcon = document.querySelector('.fa-user');
    const navRight = document.querySelector('.nav-right');

    // Replace the login icon with a dropdown for logged users
    const userDropdown = document.createElement('div');
    userDropdown.classList.add('user-dropdown');
    
    userDropdown.innerHTML = `
        <i class="fa fa-user-circle icon-hover"></i>
        <div class="user-dropdown-menu">
            <a href="./orders.html">View Orders</a>
            <a href="#" id="logout-link">Logout</a>
            ${user.role === 'admin' ? '<a href="./admin-panel.html">Admin Panel</a>' : ''}
        </div>
    `;
    
    // Remove old login icon and add dropdown
    navRight.replaceChild(userDropdown, loginIcon);

    // Add event listener for logout
    document.getElementById('logout-link').addEventListener('click', () => {
        loggedInUser = null;
        localStorage.removeItem('loggedInUser'); // Remove from localStorage
        window.location.reload(); // Reset page
    });

    // Hover to show dropdown
    const dropdownMenu = userDropdown.querySelector('.user-dropdown-menu');
    userDropdown.addEventListener('mouseenter', () => {
        dropdownMenu.style.display = 'block';
    });
    userDropdown.addEventListener('mouseleave', () => {
        dropdownMenu.style.display = 'none';
    });
}

// Initialize slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 7000); 
});

// Initialize navbar if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (loggedInUser) {
        updateNavbarForUser(loggedInUser);
    }

    // Add login form submit handler
    document.querySelector('form').addEventListener('submit', onLogin);
});




// Scroll down to categories on button click
document.getElementById('scroll-down-btn').addEventListener('click', () => {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('hero');
    const heroText = document.getElementById('hero-text');

    // Check if elements exist before proceeding
    if (!hero || !heroText) {
        return; // Exit if elements are not found
    }

    const slides = [
        {
            image: 'url("../assets/data/images/4.jpeg")',
            text: 'Modern Living Spaces'
        },
        {
            image: 'url("../assets/data/images/2.jpeg")',
            text: 'Elegant Dining Rooms'
        },
        {
            image: 'url("../assets/data/images/3.jpeg")',
            text: 'Comfortable Bedrooms'
        }
    ];

    let currentSlideIndex = 0;

    function changeSlide() {
        hero.style.backgroundImage = slides[currentSlideIndex].image;

        heroText.style.opacity = 0; 
        setTimeout(() => {
            heroText.textContent = slides[currentSlideIndex].text;
            heroText.style.opacity = 1; 
        }, 500); 

        currentSlideIndex = (currentSlideIndex + 1) % slides.length; 
    }

    setInterval(changeSlide, 5000);
    changeSlide();
});



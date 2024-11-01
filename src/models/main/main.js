document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registrationForm");

    // Add submit event listener to the login form
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        console.log("Login attempt with:", email, password);
        await onLogin(email, password); // Use the function for logging in
    });

    // Add submit event listener to the registration form
    registrationForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            document.getElementById('registration-message').textContent = "Passwords don't match";
            return;
        }

        console.log("Registration attempt with:", email, password);
        await onRegister(email, password); // Use the function for registration
    });
});

// Function to authenticate user
async function onLogin(email, password) {
    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("Login response:", data);

        if (response.ok) {
            if (data.user && data.user.role) {
                localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                console.log("Logged in user saved to localStorage:", localStorage.getItem('loggedInUser'));

                hideLoginPopup();
                updateNavbarForUser(data.user);
            } else {
                alert('Login successful, but user role is missing.');
            }
        } else {
            alert(data.message || 'Invalid email or password.');
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert('An error occurred during login.');
    }
}

// Handle user registration
async function onRegister(email, password, username) {
    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email, 
                password, 
                username,  
                role: 'user'  
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            toggleLoginState(); 
        } else {
            document.getElementById('registration-message').innerText = data.message || 'Registration failed.';
        }
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById('registration-message').innerText = 'An error occurred during registration.';
    }
}


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
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registrationForm");

    if (title.textContent === "Login") {
        title.textContent = "Sign Up";
        toggleState.innerHTML = 'Already have an account? <span onclick="toggleLoginState()">Login here</span>';
        
        // Show registration form and hide login form
        registrationForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        title.textContent = "Login";
        toggleState.innerHTML = 'Create a new account <span onclick="toggleLoginState()">Click here</span>';
        
        // Show login form and hide registration form
        loginForm.style.display = 'block';
        registrationForm.style.display = 'none';
    }
}

// Update navbar for logged-in user
function updateNavbarForUser(user) {
    if (!user || !user.role) {
        console.error('User role is missing:', user);
        return;
    }

    const loginIcon = document.querySelector('.fa-user');
    const navRight = document.querySelector('.nav-right');

    if (!loginIcon || !navRight) {
        console.error('Login icon or navRight element not found in the DOM');
        return;
    }

    // Create a new dropdown for the logged-in user
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
    let loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        try {
            loggedInUser = JSON.parse(loggedInUser);
            updateNavbarForUser(loggedInUser);
        } catch (error) {
            console.error("Error parsing loggedInUser:", error);
        }
    }
});

// Initialize hero section
document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('hero');
    const heroText = document.getElementById('hero-text');

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

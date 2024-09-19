
function showLoginPopup() {
    document.getElementById("login-popup").style.display = "flex";
}

function hideLoginPopup() {
    document.getElementById("login-popup").style.display = "none";
}

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

function onLogin(event) {
    event.preventDefault();
    
    hideLoginPopup();
}


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


// Categories
document.getElementById('scroll-down-btn').addEventListener('click', () => {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', function () {
    const hero = document.getElementById('hero');
    const heroText = document.getElementById('hero-text');

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



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    

    // Add submit event listener to the login form
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();     
        

         // Get username and password from the form
        const username = this.username.value;
        const password = this.password.value;

        authenticateUser(username, password);
    });

    // Function to authenticate user
    function authenticateUser(username, password) {
        const savedUserString = localStorage.getItem('user');
        const savedUser = savedUserString ? JSON.parse(savedUserString) : null;
        console.log('Saved user from localStorage:', savedUser);
    
        if (savedUser && (username === savedUser.email || username === savedUser.username) && password === savedUser.password) {
            localStorage.setItem('isLoggedIn', true);
            loginMessage.textContent = 'Пријава успешна!';
           
            window.location.href = '/';
        } else {
          loginMessage.textContent = "Invalid username or password"
        }
    }
});

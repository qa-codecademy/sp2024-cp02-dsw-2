document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registrationForm = document.getElementById("registrationForm");
   

   // Add submit event listener to the login form
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        console.log("Login attempt with:", email, password); 
        await onLogin(email, password); 
    });

    // Submit for registration 
    registrationForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const username = document.getElementById('reg-username').value;

        if (password !== confirmPassword) {
            document.getElementById('registration-message').textContent = "Passwords don't match";
            return;
        }

        console.log("Registration attempt with:", email, password); 
        await onRegister(email, password, username); 
    });
});

 // Function to authenticate user
async function authenticateUser(email, password) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Successful login:', data);
           
        } else {
            const errorData = await response.json();
            console.error('error:', errorData.message);
        }
    } catch (error) {
        console.error('error', error);
    }
}






document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Спречување стандардното submit-ување на формата
        
        const username = this.username.value;
        const password = this.password.value;

        authenticateUser(username, password);
    });

    function authenticateUser(username, password) {
        // Вчитување на зачуваните податоци од localStorage
        const savedUserString = localStorage.getItem('user');
        const savedUser = savedUserString ? JSON.parse(savedUserString) : null;
        console.log('Saved user from localStorage:', savedUser);
    
        if (savedUser && (username === savedUser.email || username === savedUser.username) && password === savedUser.password) {
            // Пријава успешна
            localStorage.setItem('isLoggedIn', true);
            loginMessage.textContent = 'Пријава успешна!';
            // Пренасочување на почетната страница или друга страница
            window.location.href = '/';
        } else {
            // Пријавата неуспешна
            loginMessage.textContent = 'Невалидно корисничко име или лозинка. Ве молиме обидете се повторно.';
        }
    }
});

/* Kod för att logga in */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const errorMessageEl = document.getElementById('error-message');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        /* Skicka data till API */
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Inloggning misslyckades');
            }
            return response.json();
        })
        /* Skicka vidare besökare till home.html efter token skapats */
        .then(data => {
            localStorage.setItem('token', data.response.token);
            window.location.href = '/home.html'

        })
        /* Hantera fel */
        .catch (error => { 
            errorMessageEl.textContent = 'Fel användarnamn/lösenord'
            console.error('Inloggning misslyckades:', error)
        });
    })
})
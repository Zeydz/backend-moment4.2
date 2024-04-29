/* Kod för att registrera användare */
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const statusMessageEl = document.getElementById('status-message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        /* Skicka post för att registrera användare */
        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registrering misslyckades');
            }
            statusMessageEl.textContent = 'Användare registrerad';
            
            /* Nollställ värden efter skickat formulär */
            usernameInput.value = '';
            passwordInput.value = '';
        })
        .catch (error => { 
            /* Hantera fel som uppstår */
            console.error('Registrering misslyckades:', error);
            statusMessageEl.textContent = 'Registrering misslyckades';
        });
    });
});

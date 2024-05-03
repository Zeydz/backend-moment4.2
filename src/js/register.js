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
        showLoadingSpinner()
        /* Skicka post för att registrera användare */
        fetch('https://backend-moment4.onrender.com/api/register', {
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
            hideLoadingSpinner()
            statusMessageEl.style.color = 'green';
            statusMessageEl.textContent = 'Användare registrerad';
            
            /* Nollställ värden efter skickat formulär */
            usernameInput.value = '';
            passwordInput.value = '';
        })
        .catch (error => { 
            /* Hantera fel som uppstår */
            hideLoadingSpinner()
            console.error('Registrering misslyckades:', error);
            statusMessageEl.style.color = 'red';
            statusMessageEl.textContent = 'Registrering misslyckades';
            
        });
    });
});

/* Laddningsanimation som visar spinnern */
function showLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
  }
  /* Laddningsanimation som gömmer spinnern */
  function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
  }
  
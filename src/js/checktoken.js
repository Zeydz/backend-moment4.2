
/* Fil för att kontrollera om där finns en godkänd token */
function checkAuthentication() {
    const token = localStorage.getItem('token'); 
    if (!token) {
        window.location.href = '/index.html'
    } else {
        fetch('https://backend-moment4.onrender.com/api/check-auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Ogiltig JWT-TOKEN');
            }
        })
        .catch(error => {
            console.error('Ogiltig JWT-TOKEN:', error);
            window.location.href = '/index.html'
        })
    }
}
/* Logga ut funktion */
const logOutEl = document.getElementById('log-out');
logOutEl.addEventListener('click', logOut);
function logOut() {
    localStorage.removeItem('token');
}
document.addEventListener('DOMContentLoaded', checkAuthentication);
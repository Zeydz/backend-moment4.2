/* Fil för att kontrollera om där finns en godkänd token */
function checkAuthentication() {
    const token = localStorage.getItem('token'); 
    console.log(token)   
    if (!token) {
        window.location.href = '/index.html'
    } else {
        fetch('http://localhost:3000/api/check-auth', {
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
document.addEventListener('DOMContentLoaded', checkAuthentication);
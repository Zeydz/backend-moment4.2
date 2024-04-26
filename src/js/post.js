"use strict";

/* Kod för att skicka iväg (POST) med Fetch */
document.getElementById('add-experience-form').addEventListener('submit', submitForm);

async function submitForm(event) {
    event.preventDefault();

    /* Skapar ett FormData objekt från formuläret som skickas */
    const formData = new FormData(event.target);

    /* Tar datan och lägger in i objekt */
    const postData = {
        companyname: formData.get('companyname'),
        jobtitle: formData.get('jobtitle'),
        location: formData.get('location'),
        startdate: formData.get('startdate'),
        enddate: formData.get('enddate'),
        description: formData.get('description')
    };

    /* Skicka iväg datan */
    try {
        const response = await fetch('https://backend-moment3-pbtd.onrender.com/api/work-experiences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to submit form data.');
        }
        alert('Formuläret har skickats!');

    } catch (error) {
        console.error('Error submitting form data: ', error.message);
        alert('Ett fel uppstod vid skickande av formuläret. Vänligen försök igen.');

    }
}

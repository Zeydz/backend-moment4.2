"use strict";
import { deleteWorkExperience } from "./delete";

/* Kör fetchWorkExperiences när sidan laddats in. */
document.addEventListener('DOMContentLoaded', () => {
    fetchWorkExperiences();
});

/* Hämtar all data från api/work-experiences */
export async function fetchWorkExperiences() {
    try {
        const response = await fetch ('https://backend-moment3-pbtd.onrender.com/api/work-experiences');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message) || 'Failed to fetch work experiences.'
        }

        /* Hämtar listan och nollställer */
        const workExperiencesList = document.getElementById('work-experiences-list');
        workExperiencesList.innerHTML = '';

        data.forEach(workExperience => {
            const startdate = workExperience.startdate.split("T")[0];
            const enddate = workExperience.enddate.split("T")[0];
            /* Information från fetch */
            const listItem = document.getElementById('work-experiences-list');
            listItem.innerHTML += `<li><strong>Företagsnamn:</strong> ${workExperience.companyname} <br>
            <strong>Jobbtitel:</strong> ${workExperience.jobtitle}<br>
            <strong>Plats:</strong> ${workExperience.location}<br>
            <strong>Startdatum:</strong> ${startdate}<br>
            <strong>Slutdatum:</strong> ${enddate}<br>
            <strong>Beskrivning:</strong> ${workExperience.description}<br>
            <button class="delete-button" data-post-id="${workExperience._id}">TA BORT</button
            </li>`;
        });
        attachDeleteEventListeners();

        /* Funktion för att ta bort specifikt jobbid från webbplatsen */
        function attachDeleteEventListeners() {
            const deleteButtons = document.querySelectorAll('.delete-button')
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const postID = button.getAttribute('data-post-id');
                    deleteWorkExperience(postID);
                });
            });
        }
    } catch (error) {
        console.error('Error fetching work experiences: ' + error.message);
    }
}
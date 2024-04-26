"use strict";
import { fetchWorkExperiences } from "./get";

/* Exporterar funktionen. Funktionen skickar DELETE till API med workExperienceID. */
export async function deleteWorkExperience(workExperienceID) {
    try {
        const response = await fetch(`https://backend-moment3-pbtd.onrender.com/api/work-experiences/${workExperienceID}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message) || 'Failed to delete work experience.';
        }

        fetchWorkExperiences();

    } catch (error) {
        console.error('Error deleting work experience: ' + error.message);
    }
}
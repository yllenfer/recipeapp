// recipecontainer.js
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function redirectToRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    console.log(recipeId);
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62 ';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Recipe Data:", data);
            const recipeContainer = document.getElementById('recipeContainer');
            if (recipeContainer) {
                recipeContainer.innerHTML = `
                    <h1>${data.title}</h1>
                    console.log(data.title);
                    <img src="${data.image}" alt="${data.title}">
                    <p>Calories: ${data.nutrition.nutrients[0].amount} ${data.nutrition.nutrients[0].unit}</p>
                    <p>${data.summary}</p>
                    <h2>Instructions</h2>
                    <ol>${data.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')}</ol>
                `;
            }
        })
        .catch(error => console.error("Error fetching recipe:", error));
}

window.onload = redirectToRecipe;

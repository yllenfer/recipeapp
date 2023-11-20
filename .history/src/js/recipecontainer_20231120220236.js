// recipecontainer.js
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function redirectToRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    console
    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recipeContainer = document.getElementById('recipeContainer');
            if (recipeContainer) {
                recipeContainer.innerHTML = `
                    <h1>${data.title}</h1>
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

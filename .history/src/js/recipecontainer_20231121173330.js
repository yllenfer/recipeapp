import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function redirectToRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.title = data.title;
            const recipeContainer = document.getElementById('recipeContainer');
            if (recipeContainer) {
                recipeContainer.innerHTML = `
                    <h1>${data.title}</h1>
                    <img class="recipeImage" src="${data.image}" /><bra
                    <p>Rating: ${data.spoonacularScore.toFixed(1)}</p>
                    <p>${data.summary}</p>  
                `;
            }
        })
        .catch(error => console.error("Error fetching recipe:", error));
}

window.onload = redirectToRecipe;


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
                    <h1 class="recipeDisplayTitle">${data.title}</h1>
                    <img class="recipeImage" src="${data.image}" />
                    <p class="recipeRating">Rating: ${data.spoonacularScore.fixed(1)}</p>
                    <p class="recipeSummary">${data.summary}</p>  
                `;
            }
        })
        //round the rating to one decimal place 
        

        
        .catch(error => console.error("Error fetching recipe:", error));
}

window.onload = redirectToRecipe;


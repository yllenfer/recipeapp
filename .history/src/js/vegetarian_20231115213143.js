import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

// vegetarian.js
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display vegetarian recipes
    const diet = "vegetarian"; // Specify the diet you want to search for
    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';

    // Spoonacular API endpoint for recipe search
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipes
            displayRecipes(data.results);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });

    function displayRecipes(recipes) {
        // Assuming recipes is an array, you can customize this based on the actual structure
        const recipeHtml = recipes.map(recipe => `
            <h3 class="recipeHeader">${recipe.title}</h3>
            <p>${recipe.summary}</p>
            <!-- Add more details as needed -->
        `).join('');

        // Insert the recipe HTML into the container
        const recipeContainer = document.getElementById('recipeContainer');
        if (recipeContainer) {
            recipeContainer.innerHTML = recipeHtml;
        }
    }
});



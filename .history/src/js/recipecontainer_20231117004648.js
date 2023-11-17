// recipecontainer.js

import { loadHeaderFooter } from "./utils.mjs";
import { fetchRecipes } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async function () {
    // Extract recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        // Fetch and display recipe details
        await displayRecipeDetails(recipeId);
    } else {
        console.error('Recipe ID not found in the URL.');
    }
});

// Function to get and display recipe details
async function displayRecipeDetails(recipeId) {
    try {
        // Use the fetchRecipes function to get the array of recipes
        const recipes = await fetchRecipes();

        // Find the recipe with the specified ID
        const selectedRecipe = recipes.find(recipe => recipe.id.toString() === recipeId);

        if (selectedRecipe) {
            // Display the details of the selected recipe
            const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
            if (recipeDetailsContainer) {
                recipeDetailsContainer.innerHTML = `
                    <h1>${selectedRecipe.title}</h1>
                    <p>Calories: ${selectedRecipe.calories}</p>
                    <!-- Add more HTML for other details -->
                `;
            }
        } else {
            console.error('Recipe not found with the specified ID.');
        }
    } catch (error) {
        console.error('Error fetching or displaying recipe details:', error);
    }
}

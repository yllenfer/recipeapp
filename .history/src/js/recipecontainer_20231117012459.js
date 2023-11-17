import { loadHeaderFooter } from "./utils.mjs";
import { fetchRecipeDetails } from "./utils.mjs";

loadHeaderFooter();

// Fetch and display the details of a specific recipe
fetchRecipeDetails()
    .then(recipe => {
        // Handle the data and display the name of the specific recipe
        displayRecipeName(recipe);
    })
    .catch(error => {
        console.error("Error fetching recipe details:", error);
    });

// Function to display the name of the specific recipe
function displayRecipeName(recipe) {
    // Log the entire recipe data to inspect its structure
    console.log("Recipe details:", recipe);

    // Extract the title from the recipe
    const recipeTitle = recipe.title;

    // Insert the recipe title into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = `<h3>${recipeTitle}</h3>`;
    }
}

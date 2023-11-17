import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded
    const vegetarianButton = document.getElementById("vegetarianButton");

    if (vegetarianButton) {
        vegetarianButton.addEventListener("click", function () {
            // Redirect to the vegetarian.html page
            window.location.href = "./diets/vegetarian.html";
        });
    }
});




//create a function to diplay the recipe details
export function displayRecipeDetails(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes) || recipes.length === 0) {
        console.error("Invalid data format: recipes is not an array or is empty");
        return;
    }

    // Take the first recipe from the array
    const recipe = recipes[0];

    // Extract the title from the recipe
    const recipeTitle = recipe.title;

    // Insert the recipe title into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = `<h3>${recipeTitle}</h3>`;
    }
}
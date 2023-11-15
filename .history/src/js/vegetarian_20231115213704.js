import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function displayVegetarian(recipes) {
    // Log the recipes data to inspect its structure
    console.log("Recipes data:", recipes);

    // Check if recipes is an array
    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

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


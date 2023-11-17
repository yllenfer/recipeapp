import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//Create a function to display the recipes and uses the apikey to fetch the data
export function displayRecipes(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    const recipeHtml = recipes.map(recipe => `
    <div class="recipe">
        <h3>
            <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>
        </h3>
        <input type="checkbox" class="save-recipe-checkbox" data-recipe-id="${recipe.id}" />
    </div>
`).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}


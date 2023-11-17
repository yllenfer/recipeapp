import { loadHeaderFooter } from "./utils.mjs";
import { getRecipeDetails } from "./findRecipe.mjs";
loadHeaderFooter();

// recipecontainer.js


window.onload = function () {
    // Extract recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        // Fetch and display recipe details
        getRecipeDetails(recipeId);
    } else {
        console.error('Recipe ID not found in the URL.');
    }
};

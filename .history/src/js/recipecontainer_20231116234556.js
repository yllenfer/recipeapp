import { loadHeaderFooter, renderWithTemplate, loadTemplate } from "../js/utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async function () {
    const recipeContainer = document.getElementById("recipeContainer");

    // Extract the recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    console.log("Recipe ID from URL:", recipeId);

    if (!recipeId) {
        console.error("Recipe ID not found in the URL");
        return;
    }

    // Fetch recipe details
    const recipeDetails = await fetchRecipeDetails(recipeId);

    // Display recipe details
    renderRecipeDetails(recipeDetails);
});


async function fetchRecipeDetails(recipeId) {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw error;
    }
}

function renderRecipeDetails(recipe) {
    // Use a template to render the recipe details
    const templateFn = loadTemplate("/partials/recipe-details.html");
    renderWithTemplate(templateFn, recipeContainer, recipe);
}

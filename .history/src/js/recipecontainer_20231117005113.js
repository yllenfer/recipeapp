// recipecontainer.js

import { loadHeaderFooter } from "./utils.mjs";
import { fetchRecipes } from "./utils.mjs";

loadHeaderFooter();

// Modify the displayKeto function to accept a single recipe instead of an array of recipes
export function displayKeto(recipe) {
    // Log the entire recipe object to inspect its structure
    console.log("API response data:", recipe);

    // Display details of the specific recipe
    const recipeHtml = `
        <div class="recipe">
            <h1>${recipe.title}</h1>
            <p>Calories: ${recipe.calories}</p>
            <!-- Add more HTML for other details -->
        </div>
    `;

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

// Modify the window.onload function to fetch a single recipe by ID
window.onload = function () {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const recipeId = getRecipeIdFromURL(); // You need to implement this function

    if (recipeId) {
        fetchRecipeDetails(apiKey, recipeId)
            .then(recipe => {
                // Handle the data and display the specific recipe
                displayKeto(recipe);
            })
            .catch(error => {
                console.error("Error fetching recipe details:", error);
            });
    } else {
        console.error('Recipe ID not found in the URL.');
    }
};

// Function to extract recipe ID from the URL
function getRecipeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to fetch recipe details by ID
async function fetchRecipeDetails(apiKey, recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This should be an object representing a single recipe
}

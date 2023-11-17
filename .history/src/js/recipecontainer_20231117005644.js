import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const recipeId = getRecipeIdFromURL();

if (recipeId) {
    fetchRecipeDetails(apiKey, recipeId)
        .then(recipe => {
            // Handle the data and display the name of the specific recipe
            displayRecipeName(recipe);
        })
        .catch(error => {
            console.error("Error fetching recipe details:", error);
        });
} else {
    console.error('Recipe ID not found in the URL.');
}

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

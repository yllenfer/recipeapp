import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

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

// Function to display the name of the recipe
function displayRecipeName(recipe) {
    // Log the entire recipe data to inspect its structure
    console.log("Recipe details:", recipe);

    // Access the name property of the recipe and display it
    const recipeName = recipe.title;
    
    // Insert the recipe name into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = `<h3>${recipeName}</h3>`;
    }
}

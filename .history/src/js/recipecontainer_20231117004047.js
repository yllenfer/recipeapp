// recipecontainer.js

// Load header and footer
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

// Extract recipe ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
console.log('Recipe ID:', recipeId);

// Check if the recipe ID is present in the URL
if (recipeId) {
    // Fetch and display recipe details
    getRecipeDetails(recipeId);
} else {
    console.error('Recipe ID not found in the URL.');
}

// Function to get and display recipe details
function getRecipeDetails(recipeId) {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipe details
            displayRecipeDetails(data);
        })
        .catch(error => {
            console.error("Error fetching recipe details:", error);
        });
}

// Function to display recipe details
function displayRecipeDetails(recipeData) {
    // Log the entire data to inspect its structure
    console.log("Recipe details data:", recipeData);

    // Access specific properties from recipeData and display them in the HTML
    const recipeTitle = recipeData.title;
    const recipeCalories = recipeData.calories;
    // Add more properties as needed

    // Display recipe details in the HTML
    const recipeDetailsContainer = document.getElementById('recipeDetailsContainer');
    if (recipeDetailsContainer) {
        recipeDetailsContainer.innerHTML = `
            <h1>${recipeTitle}</h1>
            <p>Calories: ${recipeCalories}</p>
            <!-- Add more HTML for other details -->
        `;
    }
}

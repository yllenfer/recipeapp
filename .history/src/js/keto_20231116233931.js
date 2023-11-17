import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("Hello from keto.js");

document.getElementById('recipeContainer').addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is a recipe link
    if (target.tagName === 'A' && target.dataset.recipeId) {
        event.preventDefault();

        // Redirect to the specific recipe URL
        redirectToRecipe(target.dataset.recipeId);
    }
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

function displayRecipeDetails(recipe) {
    // Display the recipe details on the page
    const recipeContainer = document.getElementById('recipeContainer');

    if (recipeContainer) {
        recipeContainer.innerHTML = `
            <h1>${recipe.title}</h1>
            <p>${recipe.instructions}</p>
            <!-- Add more elements to display other information as needed -->
        `;
    }
}

async function displayKeto(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    const recipeContainer = document.getElementById('recipeContainer');

    recipes.forEach(async (recipe) => {
        const recipeDetails = await fetchRecipeDetails(recipe.id);
        displayRecipeDetails(recipeDetails);
    });
}

window.onload = function () {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=ketogenic&apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipes
            displayKeto(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
};

import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export function displayInfo(data) {
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

window.onload = function () {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';

    // Extract the recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        // Fetch data for the specific recipe by ID
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        // Fetch data from the Spoonacular API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Handle the data and display the recipe title
                displayInfo(data);
            })
            .catch(error => {
                console.error("Error fetching recipe details:", error);
            });
    } else {
        console.error('Recipe ID not found in the URL.');
    }
};


//create a function to diplay
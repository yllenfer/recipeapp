import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export function displayInfo(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    // Take the first recipe from the array
    const recipe = recipes[0];

    if (!recipe) {
        console.error("No recipe found in the data");
        return;
    }

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
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=ketogenic&apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipe title
            displayInfo(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
};

import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export function displayKeto(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    const recipeHtml = recipes(recipe => `
    <div class="recipe">
        <h3>
            <a href="../recipe-display/recipecontainer.html?${recipe.id}" target="_blank">${recipe.title}</a>
        </h3>
    </div>
`);

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
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
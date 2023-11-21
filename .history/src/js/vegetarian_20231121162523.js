// vegetarian.js
import { displayLoader, loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();
displayLoader();

export function displayVegetarian(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    const recipeHtml = recipes.map(recipe => `
    <div class="recipe">
    <title>${}</title>
        <h3>
            <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>
        </h3>
        <input type="checkbox" class="save-recipe-checkbox" data-recipe-id="${recipe.id}" />
    </div>
`).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

window.onload = function () {

    //Use the api from my .env file creted in the root folder, create the variable and use it in the fetch
    


    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';

    
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipes
            displayVegetarian(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
};
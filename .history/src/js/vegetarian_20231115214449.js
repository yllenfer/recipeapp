// vegetarian.js
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

function displayVegetarian(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipeHtml = recipes.map(recipe => `
      <a hre=><h3 class="recipeHeader">${recipe.title}</h3><a>
    `).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

window.onload = function () {
    // Replace 'YOUR_API_KEY' with your actual Spoonacular API key
    //const apiKey = 'YOUR_API_KEY';

    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';

    
    // Spoonacular API endpoint for recipe search
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

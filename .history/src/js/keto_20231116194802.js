import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function displayKeto(data) {
    // Log the entire data to inspect its structure
    console.log("API response data:", data);

    // Assuming recipes is an array, you can customize this based on the actual structure
    const recipes = data.results; // Adjust the key based on the API response structure

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    // Generate HTML for each recipe with a link to the Spoonacular recipe URL
    const recipeHtml = recipes.map(recipe => `
        <div class="recipe">
            <h3>
                <a href="#" onclick="redirectToRecipe('${recipe.id}')">${recipe.title}</a>
            </h3>
        </div>
    `).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

// Function to redirect to the specific recipe using its ID
function redirectToRecipe(recipeId) {
    // Assuming you have a base URL for your recipes
    const baseUrl = "https://your-recipe-site.com/recipe/";
    const recipeUrl = baseUrl + recipeId;

    // Redirect to the specific recipe URL
    window.location.href = recipeUrl;
}

window.onload = function () {

    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';
    
    
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
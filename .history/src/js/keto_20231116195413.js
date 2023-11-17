import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.getElementById('recipeContainer').addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is a recipe link
    if (target.tagName === 'A' && target.dataset.recipeId) {
        event.preventDefault();

        // Redirect to the specific recipe URL
        redirectToRecipe(target.dataset.recipeId);
    }
});


function displayKeto(data) {
    // ... (Your existing code)

    // Generate HTML for each recipe with a link to the Spoonacular recipe URL
    const recipeHtml = recipes.map(recipe => `
        <div class="recipe">
            <h3>
                <a href="#" data-recipe-id="${recipe.id}">${recipe.title}</a>
            </h3>
        </div>
    `).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}


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
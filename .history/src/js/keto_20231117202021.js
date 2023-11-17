import { loadHeaderFooter,getLocalStorage, setLocalStorage } from "./utils.mjs";

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

export function displayKeto(data) {
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
        <h3>
            <a href="../recipe-display/recipecontainer.html?${recipe.id}" target="_blank">${recipe.title}</a>
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

document.addEventListener("DOMContentLoaded", function () {
    const saveCheckboxes = document.querySelectorAll(".save-recipe-checkbox");

    saveCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const recipeId = this.getAttribute("data-recipe-id");

            // Save or remove the recipe ID to/from local storage based on checkbox state
            if (this.checked) {
                saveRecipeToLocalStorage(recipeId);
                console.log(`Recipe ${recipeId} saved successfully!`);
            } else {
                removeRecipeFromLocalStorage(recipeId);
                console.log(`Recipe ${recipeId} removed from saved recipes.`);
            }
        });
    });

    // Function to save the recipe ID to local storage
    function saveRecipeToLocalStorage(recipeId) {
        const savedRecipes = getLocalStorage("savedRecipes") || [];
        if (!savedRecipes.includes(recipeId)) {
            savedRecipes.push(recipeId);
            setLocalStorage("savedRecipes", savedRecipes);
            console
        }
    }

    // Function to remove the recipe ID from local storage
    function removeRecipeFromLocalStorage(recipeId) {
        const savedRecipes = getLocalStorage("savedRecipes") || [];
        const updatedRecipes = savedRecipes.filter(id => id !== recipeId);
        setLocalStorage("savedRecipes", updatedRecipes);
    }
});
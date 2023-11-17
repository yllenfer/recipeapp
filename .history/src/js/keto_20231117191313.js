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
        <button class="save-recipe" data-recipe-id="${recipe.id}">Save recipe</button>
    </div>
`).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

window.onload = function () {
    const saveButtons = document.querySelectorAll(".save-recipe"); // Fix class name here

    saveButtons.forEach(button => {
        button.addEventListener("click", function () {
            const recipeId = this.getAttribute("data-recipe-id");

            // Save the recipe ID to local storage
            saveRecipeToLocalStorage(recipeId);
        });
    });

    // Function to save the recipe ID to local storage
    function saveRecipeToLocalStorage(recipeId) {
        // Retrieve existing saved recipes from local storage (if any)
        const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

        // Check if the recipe is already saved
        if (!savedRecipes.includes(recipeId)) {
            // If not saved, add it to the array
            savedRecipes.push(recipeId);

            // Save the updated array back to local storage
            localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

            // You can add additional logic here, such as updating UI to indicate the recipe is saved
            console.log(`Recipe ${recipeId} saved successfully!`);
        } else {
            // Handle case where the recipe is already saved
            console.log(`Recipe ${recipeId} is already saved.`);
        }
    }
};

import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

function displaySavedRecipes() {
    const savedRecipes = getLocalStorage('savedRecipes');
    const recipeContainer = document.getElementById('recipeContainer');

    if (recipeContainer) {
        recipeContainer.innerHTML = savedRecipes.map(recipe => `
        <div class="recipe">
            <h3>
                <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>
            </h3>
            <input type="checkbox" class="save-recipe-checkbox" data-recipe-id="${recipe.id}" />
        </div>
    `).join('');
    }
}

window.onload = displaySavedRecipes;


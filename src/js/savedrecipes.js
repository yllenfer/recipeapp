import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function displaySavedRecipes() {
    const savedRecipesData = localStorage.getItem('savedRecipes');
    const savedRecipes = savedRecipesData ? JSON.parse(savedRecipesData) : [];
    const recipeContainer = document.getElementById('recipeContainer');

    if (recipeContainer) {
        if (savedRecipes.length > 0) {
            console.log(savedRecipes);
            recipeContainer.innerHTML = savedRecipes.map(recipe => `
            <div class="recipe">
                <h3>
              <a href=""> ${recipe.title} </a>  
                </h3?
              
            </div>
        `).join('');
        
        } else {
            recipeContainer.innerHTML = `<p class="noRecipes">You have no saved recipes.</p>`;
        }
    }
}

window.onload = displaySavedRecipes;

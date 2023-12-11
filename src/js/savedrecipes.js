/**
 * Main JavaScript File for Saved Recipes Page
 * 
 * This file is responsible for loading the header and footer using the `loadHeaderFooter` function
 * and displaying saved recipes in the `recipeContainer` element when the page is loaded.
 * 
 * Functions:
 * 1. `displaySavedRecipes`: Fetches saved recipes from local storage and displays them on the page.
 * 
 * @module main
 */

import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

/**
 * Display Saved Recipes
 * 
 * This function retrieves saved recipes from local storage and displays them in the `recipeContainer` element.
 * If there are no saved recipes, it displays a message indicating that there are no saved recipes.
 * 
 * @function
 */
function displaySavedRecipes() {
  // Retrieve saved recipes from local storage
  const savedRecipesData = localStorage.getItem('savedRecipes');
  const savedRecipes = savedRecipesData ? JSON.parse(savedRecipesData) : [];
  
  // Get the recipe container element
  const recipeContainer = document.getElementById('recipeContainer');

  // Check if the recipe container element exists
  if (recipeContainer) {
    // Check if there are saved recipes
    if (savedRecipes.length > 0) {
      // Display saved recipes in the recipe container
      recipeContainer.innerHTML = savedRecipes.map(recipe => `
        <div class="recipe">
          <h3>
            <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>  
          </h3> 
        </div>
      `).join('');
    } else {
      // Display a message indicating no saved recipes
      recipeContainer.innerHTML = `<p class="noRecipes">You have no saved recipes.</p>`;
    }
  }
}

// Execute the `displaySavedRecipes` function when the window is fully loaded
window.onload = displaySavedRecipes();

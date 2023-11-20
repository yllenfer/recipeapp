import { loadHeaderFooter,getLocalStorage, setLocalStorage, displayLoader, displayRecipeAll } from "./utils.mjs";


loadHeaderFooter();
displayLoader();
dis

document.getElementById('recipeContainer').addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is a recipe link
    if (target.tagName === 'A' && target.dataset.recipeId) {
        event.preventDefault();

        // Redirect to the specific recipe URL
        redirectToRecipe(target.dataset.recipeId);
    }
});



//Create a function to save the recipe to local storage

function saveRecipe(recipeId) {
    // Get the existing saved recipes from local storage
    const savedRecipes = getLocalStorage('s~avedRecipes') || [];

    // Check if the recipe ID is already saved
    if (savedRecipes.includes(recipeId)) {
        alert('This recipe is already saved');
        return;
    }

    // Add the recipe ID to the saved recipes array
    savedRecipes.push(recipeId);

    // Save the updated saved recipes array to local storage
    setLocalStorage('savedRecipes', savedRecipes);


}

// Create a function to handle the checkbox click event

function handleCheckboxClick(event) {
    const target = event.target;

    // Check if the clicked element is a checkbox
    if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.dataset.recipeId) {
        // Save the recipe ID to local storage
        saveRecipe(target.dataset.recipeId);
        //make this function to keeep the checkbox checked after refresh if the recipe is saved
        //saveRecipe(target.dataset.recipeId);
        
        


    }
}

// Attach the event listener to the recipe container

document.getElementById('recipeContainer').addEventListener('click', handleCheckboxClick);


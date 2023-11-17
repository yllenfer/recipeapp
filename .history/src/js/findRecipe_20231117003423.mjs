import { fetchRecipes } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

export const getRecipeDetails = async (recipeId) => {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        displayRecipeDetails(data);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
};



const displayRecipeDetails = (recipe) => {
    const recipeDetailsContainer = document.getElementById('recipeDetails');
    if (recipeDetailsContainer) {
        // Display recipe details in your desired format
        const recipeHtml = `<h1>${recipe.title}</h1>`;
        recipeDetailsContainer.innerHTML = recipeHtml;
    }
};
import { fetchRecipes } from './utils.mjs';

const displayRecipes = async () => {
  try {
    const recipes = await fetchRecipes();
    // Update your UI to display the fetched recipes
    console.log(recipes);
  } catch (error) {
    // Handle errors (e.g., display an error message to the user)
    console.error('Error:', error);
  }
};

// Call the function when needed
displayRecipes();

// main.js

// Function to fetch recipes
const fetchRecipes = async () => {
    const apiKey = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your Spoonacular API key
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Function to display recipes in the specified container
const displayRecipes = async () => {
    const recipeContainer = document.getElementById('recipeContainer');

    try {
        const recipes = await fetchRecipes();
        
        // Assuming recipes is an array, you can customize this based on the actual structure
        const recipeHtml = recipes.map(recipe => `
            <h2>${recipe.title}</h2>
            <p>${recipe.instructions}</p>
            <!-- Add more HTML elements for other recipe details as needed -->
        `).join('');

        // Insert the recipe HTML into the container
        recipeContainer.innerHTML = recipeHtml;
    } catch (error) {
        // Handle errors (e.g., display an error message to the user)
        console.error('Error:', error);
    }
};

// Call the function to display recipes when the page loads
window.onload = displayRecipes;

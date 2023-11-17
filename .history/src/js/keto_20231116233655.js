import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("Hello from keto.js");
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
    </div>
`).join('');

    // Insert the recipe HTML into the container
    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}




window.onload = async function () {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    const recipeId = new URLSearchParams(window.location.search).get('id');

    if (!recipeId) {
        console.error("Recipe ID not provided in the URL");
        return;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // Display the recipe details on the page
        const recipeContainer = document.getElementById('recipeContainer');

        if (recipeContainer) {
            recipeContainer.innerHTML = `
                <h1>${data.title}</h1>
                <p>${data.instructions}</p>
                <!-- Add more elements to display other information as needed -->
            `;
        }
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
};

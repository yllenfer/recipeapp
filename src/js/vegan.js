import { loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();


export function displayVegan(data) {

    console.log("API response data:", data);


    const recipes = data.results;

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

    const recipeHtml = recipes.map(recipe => `
    <div class="recipe">
        <h3>
            <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>
        </h3>
        <input type="checkbox" class="save-recipe-checkbox" data-recipe-id="${recipe.id}" />
    </div>
`).join('');


    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
}

window.onload = function () {


    


    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';

    
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the data and display the recipes
            displayVegan(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
};
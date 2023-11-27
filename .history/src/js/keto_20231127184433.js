import { loadHeaderFooter,getLocalStorage, setLocalStorage, displayLoader } from "./utils.mjs";


loadHeaderFooter();
displayLoader();

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

    
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=ketogenic&apiKey=${apiKey}`;

   
    fetch(apiUrl)
        .then(response => {
            if (response.status === 402) {
                throw new Error('API quota exceeded');
            } else if (response.status === 4004) {
                throw new Error('Invalid API key');
            }
            
        })
        .then(response => response.json())
        .then(data => {
        
            displayKeto(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
};




function saveRecipe(recipeId) {
   
    const savedRecipes = getLocalStorage('s~avedRecipes') || [];

 
    if (savedRecipes.includes(recipeId)) {
        alert('This recipe is already saved');
        return;
    }


    savedRecipes.push(recipeId);


    setLocalStorage('savedRecipes', savedRecipes);


}



function handleCheckboxClick(event) {
    const target = event.target;

   
    if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.dataset.recipeId) {
     
        saveRecipe(target.dataset.recipeId);
       
        


    }
}



document.getElementById('recipeContainer').addEventListener('click', handleCheckboxClick);


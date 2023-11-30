import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

document.getElementById('recipeContainer').addEventListener('click', function(event) {
    const target = event.target;

 
    if (target.tagName === 'A' && target.dataset.recipeId) {
        event.preventDefault();

        redirectToRecipe(target.dataset.recipeId);
    }
});


function loadSavedRecipes() {
    return getLocalStorage('savedRecipes') || [];
}

export function displayKeto(data) {
    console.log("API response data:", data);

    const recipes = data.results;

    if (!Array.isArray(recipes)) {
        console.error("Invalid data format: recipes is not an array");
        return;
    }

   
    const savedRecipes = loadSavedRecipes();

    const recipeHtml = recipes.map(recipe => {
        const isChecked = savedRecipes.includes(recipe.id);
        return `<div class="recipe">
    <h3>
        <a href="../recipe-display/recipecontainer.html?id=${recipe.id}" target="_blank">${recipe.title}</a>
    </h3>
    <input type="checkbox" class="save-recipe-checkbox" data-recipe-id="${recipe.id}" />
</div>`
    }).join('');

    const recipeContainer = document.getElementById('recipeContainer');
    if (recipeContainer) {
        recipeContainer.innerHTML = recipeHtml;
    }
    
    
    initializeCheckboxStates(savedRecipes);
}


function initializeCheckboxStates(savedRecipes) {
    savedRecipes.forEach(recipeId => {
        const checkbox = document.querySelector(`input[data-recipe-id="${recipeId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}


function saveRecipe(recipeId) {
    const savedRecipes = loadSavedRecipes();

    if (savedRecipes.includes(recipeId)) {
        document.querySelector(`input[data-recipe-id="${recipeId}"]`).checked = true;
        alert('This recipe is already saved');
        return;
    }

    savedRecipes.push(recipeId);


    setLocalStorage('savedRecipes', savedRecipes);
}


document.getElementById('recipeContainer').addEventListener('click', handleCheckboxClick);

function handleCheckboxClick(event) {
    const target = event.target;

    if (target.tagName === 'INPUT' && target.type === 'checkbox' && target.dataset.recipeId) {
        saveRecipe(target.dataset.recipeId);
    }
}


window.onload = function () {
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?diet=ketogenic&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 402) {
                throw new Error('API quota exceeded');
            } else if (response.status === 4004) {
                throw Error('Invalid API key');
            }
            return response.json();
        })

        .then(data => {
            displayKeto(data);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            const recipeContainer = document.getElementById('recipeContainer');
            if (recipeContainer) {
                recipeContainer.innerHTML = `
                    <p class="error">Error fetching recipes too many requests: ${error.message}</p>
                `;
            }
        });
};

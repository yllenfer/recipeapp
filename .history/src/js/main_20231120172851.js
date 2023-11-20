import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

//correct the funtion

document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchForRecipe');
    var resultsContainer = document.getElementById('recipeResults');

    searchInput.addEventListener('input', function(e) {
      var query = e.target.value;
      
      if (query.length < 2) { // Wait for at least 2 characters
        resultsContainer.innerHTML = '';
        return;
      }

      fetchRecipes(query).then(updateDropdown);
    });

    function fetchRecipes(query) {
      return fetch(`https://api.spoonacular.com/recipes/autocomplete?number=5&query=${query}&apiKey=f2e848f81f85424ab0240a9b15ded9da`)
        .then(response => response.json())
        .then(data => {
          if (!data) return [];
          return data; // Assuming the API returns an array of recipe suggestions
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
          return [];
        });
    }

    function updateDropdown(recipes) {
      resultsContainer.innerHTML = ''; // Clear previous results
      recipes.forEach(recipe => {
        var div = document.createElement('div');
        div.textContent = recipe.title;
        div.onclick = function() {
          searchInput.value = recipe.title; // Update input with selected recipe
          resultsContainer.innerHTML = ''; // Clear results after selection
        };
        resultsContainer.appendChild(div);
      });
    }
  });
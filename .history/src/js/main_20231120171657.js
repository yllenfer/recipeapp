import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();

// Make the searchForRecipe input search for recipes on the spoonacular API and display them on the page

const searchForRecipe = document.getElementById('searchForRecipe');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', function (event) {
    
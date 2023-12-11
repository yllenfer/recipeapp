/**
 * Recipe Display JavaScript File
 * 
 * This file is responsible for displaying detailed information about a recipe based on the provided recipe ID.
 * It loads the header and footer using the `loadHeaderFooter` function and fetches recipe data from an external API.
 * The fetched data is then used to populate the recipe details on the page.
 * 
 * Functions:
 * 1. `redirectToRecipe`: Retrieves recipe ID from the URL parameters, fetches recipe data, and displays it.
 * 
 * @module recipeDisplay
 */

import { loadHeaderFooter } from "./utils.mjs";



// Load the header and footer
loadHeaderFooter();

/**
 * Redirect to Recipe
 * 
 * This function retrieves the recipe ID from the URL parameters, fetches recipe data from an external API,
 * and displays the recipe details on the page.
 * 
 * @function
 */
function redirectToRecipe() {
  // Get the recipe ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');

  // API key for the external recipe API
  const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';

  // Construct the API URL with the recipe ID and API key
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  // Fetch recipe data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Set the page title to the recipe title
      document.title = data.title;

      // Get the recipe container element
      const recipeContainer = document.getElementById('recipeContainer');

      // Check if the recipe container element exists
      if (recipeContainer) {
        // Populate the recipe details on the page
        recipeContainer.innerHTML = `
          <link rel="shortcut icon" href="${data.image}" />
          <h1 class="recipeDisplayTitle">${data.title}</h1>
          <img class="recipeImage" src="${data.image}" />
          <p class="recipeRating">Rating: ${data.spoonacularScore.toFixed(1)}</p>
          <p class="recipeSummary">${data.summary}</p>  
        `;
      }
    })
    .catch(error => console.error("Error fetching recipe:", error));
}


/**
 * Download PDF
 * 
 * This function generates a PDF of the recipe details and allows the user to download it when the button is clicked.
 * 
 * @function
 */
function downloadPdf() {
    const printButton = document.getElementById('printButton');
  
    printButton.addEventListener('click', function () {
      // Create a new window for printing
      const printWindow = window.open('', '', 'width=600,height=600');
      
      // Get the recipe container HTML content
      const recipeContainer = document.getElementById('recipeContainer').innerHTML;
      
      // Set the content of the new window to the recipe container content
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Recipe PDF</title>
          </head>
          <body>
            ${recipeContainer}
          </body>
        </html>
      `);
      printWindow.document.close();
      
      // Print the content
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    });
  }
  
  // Execute the `redirectToRecipe` and `downloadPdf` functions when the window is fully loaded
  window.onload = () => {
    redirectToRecipe();
    downloadPdf();
  };
  
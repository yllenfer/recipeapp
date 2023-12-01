import { loadHeaderFooter, initializeRecipeSearch } from "./utils.mjs";
loadHeaderFooter();


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded'); // Debugging line
  
    const apiKey = 'faaeb11095cf49e4a6f912aa44f9ac62';
    initializeRecipeSearch(apiKey);
  });
  



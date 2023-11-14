export const fetchRecipes = async () => {
    const apiKey = 'f2e848f81f85424ab0240a9b15ded9da';
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=vegetarian,dessert`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.recipes; // This line returns an array of recipes
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};




const displayRecipes = async () => {
    const recipeContainer = document.getElementById('recipeContainer');
    const loaderContainer = document.querySelector('.loader-container');

    try {
        console.log('Before API call - Adding loading class');
        // Show the loader while waiting for the API response
        loaderContainer.classList.add('loading');

        const recipes = await fetchRecipes();

        // Assuming recipes is an array, you can customize this based on the actual structure
        const recipeHtml = recipes.map(recipe => `
            <h2>${recipe.title}</h2>
            <p>${recipe.instructions}</p>
        `).join('');

        // Insert the recipe HTML into the container
        recipeContainer.innerHTML = recipeHtml;

    } catch (error) {
        // Handle errors (e.g., display an error message to the user)
        console.error('Error:', error);

    } finally {
        // Hide the loader after the API request completes (whether successful or not)
        loaderContainer.classList.remove('loading');
    }
};



// Call the function to display recipes when the page loads
window.onload = displayRecipes;


export async function renderWithTemplate(
    templateFn,
    parentElement,
    data,
    callback,
    position = "afterbegin",
    clear = true
  ) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    const htmlString = await templateFn(data);
    parentElement.insertAdjacentHTML(position, htmlString);
    if (callback) {
      callback(data);
    }
  }


function loadTemplate(path) {
    // wait what?  we are returning a new function? this is called currying and can be very helpful.
    return async function () {
      const res = await fetch(path);
      if (res.ok) {
        const html = await res.text();
        return html;
      }
    };
  }
  

export async function loadHeaderFooter(){
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  renderWithTemplate(headerTemplateFn, headerEl);
}
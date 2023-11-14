const searchInput = document.getElementById("searchForRecipe");
const recipeContainer = document.getElementById("recipeContainer");
const loaderContainer = document.querySelector(".loader-container");

// Add an event listener to the input field to detect changes
searchInput.addEventListener("input", debounce(performSearch, 500));

// Function to perform the recipe search
const performSearch = async () => {
  const searchTerm = searchInput.value.trim();

  // Check if the search term is not empty
  if (searchTerm) {
    try {
      // Show the loader while waiting for the API response
      loaderContainer.classList.add("loading");

      // Fetch recipes based on the search term
      const recipes = await fetchRecipes(searchTerm);

      // Assuming recipes is an array, you can customize this based on the actual structure
      const recipeHtml = recipes
        .map(
          (recipe) => `
                <h2>${recipe.title}</h2>
                <p>${recipe.instructions}</p>
            `,
        )
        .join("");

      // Insert the recipe HTML into the container
      recipeContainer.innerHTML = recipeHtml;
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      console.error("Error:", error);
    } finally {
      // Hide the loader after the API request completes (whether successful or not)
      loaderContainer.classList.remove("loading");
    }
  } else {
    // Clear the recipe container if the search term is empty
    recipeContainer.innerHTML = "";
  }
};

// Your existing fetchRecipes function
export const fetchRecipes = async (searchTerm) => {
  // Modify the API URL to include the search term
  const apiKey = "f2e848f81f85424ab0240a9b15ded9da";
  const apiUrl = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${searchTerm}&number=1`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Debounce function to limit the frequency of API requests
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Call the function to display recipes when the page loads
window.onload = displayRecipes;

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true,
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

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const headerEl = document.querySelector("#main-header");
  renderWithTemplate(headerTemplateFn, headerEl);
}

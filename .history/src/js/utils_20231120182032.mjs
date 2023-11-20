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
   // const recipeContainer = document.getElementById('recipeContainer');
    const loaderContainer = document.querySelector('.loader-container');

    //try {
       // console.log('Before API call - Adding loading class');
        // Show the loader while waiting for the API response
        //loaderContainer.classList.add('loading');

        //const recipes = await fetchRecipes();

        // Introduce a delay of 3 seconds (3000 milliseconds)
       // await new Promise(resolve => setTimeout(resolve, 2000));

        // Assuming recipes is an array, you can customize this based on the actual structure
       // const recipeHtml = recipes.map(recipe => `
         //   <h3 class="recipeHeader">Hello</h3>
           
       // `).join('');

        // Insert the recipe HTML into the container
      //  recipeContainer.innerHTML = recipeHtml;

   // } catch (error) {
        // Handle errors (e.g., display an error message to the user)
      //  console.error('Error:', error);

   // } finally {
        // Hide the loader after the API request completes (whether successful or not)
     //   loaderContainer.classList.remove('loading');
   // }
//};

// Call the function to display recipes when the page loads
//window.onload = displayRecipes;



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


export function loadTemplate(path) {
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
    return new Promise(async (resolve, reject) => {
        try {
            const headerTemplateFn = await loadTemplate("/partials/header.html");
            const footerTemplateFn = await loadTemplate("/partials/footer.html");
            const headerEl = document.querySelector("#main-header");
            const footerEl = document.querySelector("#main-footer");

            // Wait for header and footer to be rendered
            await renderWithTemplate(headerTemplateFn, headerEl);
            await renderWithTemplate(footerTemplateFn, footerEl);

            resolve(); // Resolve the promise when rendering is done
        } catch (error) {
            console.error('Error loading header or footer:', error);
            reject(error); // Reject the promise in case of an error
        }
    });
}



document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded
  const vegetarianButton = document.getElementById("vegetarianButton");

  if (vegetarianButton) {
      vegetarianButton.addEventListener("click", function () {
          // Redirect to the vegetarian.html page
          window.location.href = "./diets/vegetarian.html";
      });
  }
});


//Function to fetch recipe details by ID
export async function fetchRecipeDetails() {
    const apiKey = 'your_api_key'; // Replace with your actual API key
    const recipeId = getRecipeIdFromURL();

    if (!recipeId) {
        console.error('Recipe ID not found in the URL.');
        return null;
    }

    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    // Fetch data from the Spoonacular API
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This should be an object representing a single recipe
}

// Function to extract recipe ID from the URL
function getRecipeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

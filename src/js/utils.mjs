import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

window.onload = () => {

};


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






export function loadSavedRecipes() {
  return getLocalStorage('savedRecipes') || [];
}

export function saveRecipe(recipeId, recipeTitle) {
  const savedRecipes = loadSavedRecipes();


  if (savedRecipes.some(recipe => recipe.id === recipeId)) {
      document.querySelector(`input[data-recipe-id="${recipeId}"]`).checked = true;
      alert('This recipe is already saved');
      return;
  }


  savedRecipes.push({ id: recipeId, title: recipeTitle });
  setLocalStorage('savedRecipes', savedRecipes);
}


export function initializeCheckboxStates(savedRecipes) {
  savedRecipes.forEach(recipe => {
      const checkbox = document.querySelector(`input[data-recipe-id="${recipe.id}"]`);
      if (checkbox) {
          checkbox.checked = true;
      }
  });
}



export function handleCheckboxClick(event) {
  const target = event.target;

  if (target.tagName === 'INPUT' && target.type === 'checkbox') {
      const recipeId = target.dataset.recipeId;
      const recipeTitle = target.closest('.recipe').querySelector('h3 a').textContent;

      if (target.checked) {
          saveRecipe(recipeId, recipeTitle);
      } else {
          removeRecipe(recipeId);
      }
  }
}


function removeRecipe(recipeId) {
  let savedRecipes = loadSavedRecipes();
  savedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
  setLocalStorage('savedRecipes', savedRecipes);
}


// utils.mjs
export function toggleSavedRecipesLinkVisibility(show) {
  const savedRecipesLink = document.querySelector(".savedRecipesLink");
  if (savedRecipesLink) {
    savedRecipesLink.style.display = show ? "block" : "none";
  }
}

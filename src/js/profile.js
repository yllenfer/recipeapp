import { loadHeaderFooter } from "./utils.mjs";
import { auth } from "./firebaseAuth.mjs";
import { toggleSavedRecipesLinkVisibility } from "./utils.mjs";
import { loginLogo } from "./navigation.mjs"; 

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const userDisplayName = document.getElementById("userDisplayName");


  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();

    auth.signOut()
      .then(() => {
        console.log("User signed out");
        window.location.replace("/index.html");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      const displayName = user.displayName;

      if (displayName) {
        userDisplayName.textContent = `${displayName}`;
      } else {
        userDisplayName.textContent = `${user.email}`;
      }

      const navigation = document.querySelector("nav");

   
      // const loginImageLink = loginLogo();
      // navigation.appendChild(loginImageLink);

    
      const savedRecipesLink = document.createElement("a");
      savedRecipesLink.classList.add("savedRecipesLink");
      savedRecipesLink.href = "/recipe-display/savedrecipes.html";
      savedRecipesLink.textContent = "Saved Recipes";
      navigation.appendChild(savedRecipesLink);

      toggleSavedRecipesLinkVisibility(true);
    } else {
      console.log("User not logged in");

      const navigation = document.querySelector("nav");

     
      const savedRecipesLink = document.querySelector(".savedRecipesLink");
      if (savedRecipesLink) {
        navigation.removeChild(savedRecipesLink);
      }

   
      const loginImageLink = document.getElementById("loginImageLink");
      if (loginImageLink) {
        navigation.removeChild(loginImageLink);
      }

      // toggleSavedRecipesLinkVisibility(false);
    }
  });

 
  window.history.replaceState({}, "", "./profile.html");
});


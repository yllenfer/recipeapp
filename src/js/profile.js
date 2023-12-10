import { loadHeaderFooter } from "./utils.mjs";
import { auth } from "./firebaseAuth.mjs";
import { toggleSavedRecipesLinkVisibility } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const userDisplayName = document.getElementById("userDisplayName");
  const loginImageLink = document.getElementById("loginImageLink");
  const savedRecipesLink = document.querySelector(".savedRecipesLink");

  // Add an event listener for the logout button
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


  if (loginImageLink) {
    loginImageLink.style.backgroundColor = "lightblue";
  
  }else{
    console.log("loginImageLink is null");
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      const displayName = user.displayName;

      if (displayName) {
        userDisplayName.textContent = `Welcome, ${displayName}`;
      } else {
        userDisplayName.textContent = `Welcome, ${user.email}`;
      }

      // Check if the user is logged in
      if (loginImageLink) {
        loginImageLink.href = "./profile.html"; // Update the href to point to the profile page
      }

      const navigation = document.querySelector("nav");

      // Create and add the "Saved Recipes" link to the navigation
      const savedRecipesLink = document.createElement("a");
      savedRecipesLink.classList.add("savedRecipesLink");
      savedRecipesLink.href = "/recipe-display/savedrecipes.html";
      savedRecipesLink.textContent = "Saved Recipes";
      navigation.appendChild(savedRecipesLink);

      toggleSavedRecipesLinkVisibility(true);
    } else {
      console.log("User not logged in");

      // Check if the user is not logged in
      if (loginImageLink) {
        loginImageLink.href = "/user/register.html"; // Update the href to point to the registration page
      }

      // Hide the "Saved Recipes" link
      if (savedRecipesLink) {
        savedRecipesLink.style.display = "none";
      }

      toggleSavedRecipesLinkVisibility(false);
    }
  });

  // Replace the history state
  window.history.replaceState({}, "", "./profile.html");
});

// Test adding a background color to the loginImageLink



//TODO: Remove the checkboxes is user is not logged in
//TODO: Have the logo for registering and logged it to be different so that when navvating through 
//website I am not logged out
// Make website more aesthetically pleasing


//TODO: Remove the checkboxes is user is not logged in
//TODO: Have the logo for registering and logged it to be different so that when navvating through 
//website I am not logged out
// Make website more aesthetically pleasing

//TODO: Remove the checkboxes is user is not logged in
//TODO: Have the logo for registering and logged it to be different so that when navvating through 
//website I am not logged out
// Make website more aesthetically pleasing
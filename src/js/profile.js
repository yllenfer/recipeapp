import { loadHeaderFooter } from "./utils.mjs";
import { auth } from "./firebaseAuth.mjs";
import { toggleSavedRecipesLinkVisibility } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const userDisplayName = document.getElementById("userDisplayName");

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

  auth.onAuthStateChanged((user) => {
    if (user) {
      const displayName = user.displayName;

      if (displayName) {
        userDisplayName.textContent = `Welcome, ${displayName}`;
      } else {
        userDisplayName.textContent = `Welcome, ${user.email}`;
      }

      const navigation = document.querySelector("nav");

      // Create and add the "Saved Recipes" link to the navigation
      const savedRecipesLink = document.createElement("a");
      savedRecipesLink.classList.add("savedRecipesLink");
      savedRecipesLink.href = "/recipe-display/savedrecipes.html";
      savedRecipesLink.textContent = "Saved Recipes";
      navigation.appendChild(savedRecipesLink);

      // Create and add the new profile logo link to the navigation
      const profileLogoLink = document.createElement("a");
      profileLogoLink.classList.add("profile-logo-link");
      profileLogoLink.href = "./profile.html"; // Update this link to point to your profile page
      const profileLogoImg = document.createElement("img");
      profileLogoImg.classList.add("logo");
      profileLogoImg.src = "/images/login2.png"; // Update the image source path
      profileLogoImg.alt = "Recipe logo";
      profileLogoLink.appendChild(profileLogoImg);
      navigation.appendChild(profileLogoLink);

      // Update the visibility of logo links
      const logoLink = document.querySelector(".logo-link");
      if (logoLink) {
        logoLink.style.display = "none"; // Hide the regular logo link
      }

      toggleSavedRecipesLinkVisibility(true);
    } else {
      console.log("User not logged in");

      const navigation = document.querySelector("nav");

      // Remove the "Saved Recipes" link from the navigation
      const savedRecipesLink = document.querySelector(".savedRecipesLink");
      if (savedRecipesLink) {
        navigation.removeChild(savedRecipesLink);
      }

      // Remove the new profile logo link from the navigation
      const profileLogoLink = document.querySelector(".profile-logo-link");
      if (profileLogoLink) {
        navigation.removeChild(profileLogoLink);
      }

      // Update the visibility of logo links
      const logoLink = document.querySelector(".logo-link");
      if (logoLink) {
        logoLink.style.display = "block"; // Show the regular logo link
      }

      toggleSavedRecipesLinkVisibility(false);
    }
  });

  // Replace the history state
  window.history.replaceState("./profile.html", "./profile.html", "./profile.html");
});


//TODO: Remove the checkboxes is user is not logged in
//TODO: Have the logo for registering and logged it to be different so that when navvating through 
//website I am not logged out
// Make website more aesthetically pleasing
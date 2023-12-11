import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();


/**
 * Firebase configuration object.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

/**
 * Firebase configuration object.
 * @type {Object}
 * @property {string} apiKey - The API key for Firebase.
 * @property {string} authDomain - The authentication domain for Firebase.
 * @property {string} projectId - The project ID for Firebase.
 * @property {string} storageBucket - The storage bucket for Firebase.
 * @property {string} messagingSenderId - The messaging sender ID for Firebase.
 * @property {string} appId - The app ID for Firebase.
 * @property {string} measurementId - The measurement ID for Firebase.
 */
const firebaseConfig = {
    apiKey: "AIzaSyB70ULiD-EzvpMEjVXIRZfyGAALjV0BKrc",
    authDomain: "recipeapp-58359.firebaseapp.com",
    projectId: "recipeapp-58359",
    storageBucket: "recipeapp-58359.appspot.com",
    messagingSenderId: "708207804227",
    appId: "1:708207804227:web:93141ebce5492ce48c79f6",
    measurementId: "G-2FVV1E2L85"
  };
  
  /**
   * Function to register a user.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise} A promise that resolves when the user is registered successfully.
   */
  async function registerUser(name, email, password) {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update the user's display name with the provided name
    //   await user.updateProfile({
    //     displayName: name
    //   });
  
      console.log("User registered:", user);
  
      // Redirect to the profile page
      window.location.href = "./profile.html";
    } catch (error) {
      // Handle registration errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration error:", errorCode, errorMessage);
  
      if (errorCode === "auth/email-already-in-use") {
        alert("Email address is already in use.");
      } else {
        const errorContainer = document.getElementById("errorContainer");
        errorContainer.textContent = errorMessage;
      }
    }
  }
  
  /**
   * Function to validate the password.
   * @param {string} password - The password to be validated.
   * @returns {boolean} Returns true if the password is valid, otherwise false.
   */
  function validatePassword(password) {
    // Function implementation to validate password
  }
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // Add an event listener for the registration form submission
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
  
    // Call the registerUser function to register the user with name, email, and password
    registerUser(name, email, password);
  });
  
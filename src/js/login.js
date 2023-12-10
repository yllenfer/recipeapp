import { loadHeaderFooter } from "./utils.mjs";
import { auth } from "./firebaseAuth.mjs";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { isLoggedIn } from "./navigation.js"; // Correct the import path

loadHeaderFooter();

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        console.log("User logged in:", user);

        // Check if user is logged in
        console.log("Is logged in:", isLoggedIn());

        // Redirect to profile page if logged in
        if (isLoggedIn()) {
          console.log("Redirecting to profile page");
          window.location.href = "./profile.html";
        } else {
          console.log("User is not logged in.");
        }
      })
      .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);

        // Display the error message to the user (you can show it in an HTML element)
        const errorContainer = document.getElementById("errorContainer");
        errorContainer.textContent = errorMessage;
      });
});

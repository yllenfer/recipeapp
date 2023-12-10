import { loadHeaderFooter } from "./utils.mjs";
import { auth } from "./firebaseAuth.mjs"; // Import the auth object from your module
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // Import the signInWithEmailAndPassword function

loadHeaderFooter();

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password) // Use signInWithEmailAndPassword from Firebase
    .then((userCredential) => {
      // User logged in successfully
      const user = userCredential.user;
      console.log("User logged in:", user);
      
      // Redirect to profile page
      window.location.href = "./profile.html";
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

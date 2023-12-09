import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB70ULiD-EzvpMEjVXIRZfyGAALjV0BKrc",
    authDomain: "recipeapp-58359.firebaseapp.com",
    projectId: "recipeapp-58359",
    storageBucket: "recipeapp-58359.appspot.com",
    messagingSenderId: "708207804227",
    appId: "1:708207804227:web:93141ebce5492ce48c79f6",
    measurementId: "G-2FVV1E2L85"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };

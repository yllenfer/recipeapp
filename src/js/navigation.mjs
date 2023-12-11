import { auth } from "./firebaseAuth.mjs"; 

export function isLoggedIn() {
    return auth.currentUser !== null;
  }


export function loginLogo() {
    const loginImageLink = document.createElement("a");
    loginImageLink.id = "loginImageLink";
    loginImageLink.href = "/user/profile.html"; // Set the href to the profile page
    const loginImage = document.createElement("img");
    loginImage.classList.add("loginImage");
    loginImage.src = "/images/login.png"; // Set the image source
    loginImage.alt = "Login image";
    loginImageLink.appendChild(loginImage);
  
    return loginImageLink;
  }
  
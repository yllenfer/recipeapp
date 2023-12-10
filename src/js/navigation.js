import { auth } from "./firebaseAuth.mjs"; 

export function isLoggedIn() {
    return auth.currentUser !== null;
  }
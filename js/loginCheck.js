// here we import the session storage key for user email
import { SESSION_STORAGE_USER_EMAIL } from "./info.js";

// get the users email from session storage
const email = sessionStorage.getItem(SESSION_STORAGE_USER_EMAIL);

// check if user is logged in
if (email !== null) {
  // user IS logged in > hide login + signup and show logout button
  document.querySelector("#login").classList.add("hidden");
  document.querySelector("#logout").classList.remove("hidden");
} else {
  // user is NOT logged in > show login + signup and hide logout
  document.querySelector("#login").classList.remove("hidden");
  document.querySelector("#logout").classList.add("hidden");
}

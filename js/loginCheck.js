// here we import the session storage key for user email
import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

// get the users email from session storage
const email = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

// check if user is logged in
if (email !== null) {
  // user IS logged in > hide login + signup and show logout button + cart
  document.querySelector("#login").classList.add("hidden");
  document.querySelector("#signup").classList.add("hidden");
  document.querySelector("#logout").classList.remove("hidden");
  document.querySelector("#cart").classList.remove("hidden");
} else {
  // user is NOT logged in > show login + signup and hide logout + cart
  document.querySelector("#login").classList.remove("hidden");
  document.querySelector("#signup").classList.remove("hidden");
  document.querySelector("#logout").classList.add("hidden");
  document.querySelector("#cart").classList.add("hidden");
}

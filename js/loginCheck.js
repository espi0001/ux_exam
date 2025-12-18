import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

const email = localStorage.getItem(LOCAL_STORAGE_USER_EMAIL);

// check if user is logged in
if (email !== null) {
  document.querySelector("#login").classList.add("hidden");
  document.querySelector("#signup").classList.add("hidden");
  document.querySelector("#logout").classList.remove("hidden");
  document.querySelector("#cart").classList.remove("hidden");
} else {
  document.querySelector("#login").classList.remove("hidden");
  document.querySelector("#signup").classList.remove("hidden");
  document.querySelector("#logout").classList.add("hidden");
  document.querySelector("#cart").classList.add("hidden");
}

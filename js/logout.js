import { LOCAL_STORAGE_USER_EMAIL } from "./info.js";

document.querySelector("#btnLogout").addEventListener("click", () => {
  localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL);
  location.reload();
});

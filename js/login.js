import { USERS_BASE_URL, LOCAL_STORAGE_USER_EMAIL } from "./info.js";
import { showModal } from "./modal.js";

document.querySelector("#frmLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim().toLowerCase();
  const password = e.target.txtPassword.value.trim();

  fetch(`${USERS_BASE_URL}/users`)
    .then((response) => response.json())
    .then((data) => {
      // flag to track if user is found
      let found = false;

      // loop through all users to find a match
      data.forEach((user) => {
        if (!found) {
          if (user.email === email && user.password === password) {
            localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, email);

            location.href = "index.html";

            found = true;
          }
        }
      });

      if (!found) {
        showModal("Validation error", "Incorrect credentials.", "", "");
      }
    })
    .catch((error) => console.log(error));
});

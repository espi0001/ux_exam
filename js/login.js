import { USERS_BASE_URL, LOCAL_STORAGE_USER_EMAIL } from "./info.js";
import { showModal } from "./modal.js";

// add event listener to login form

document.querySelector("#frmLogin").addEventListener("submit", (e) => {
  // no reload
  e.preventDefault();

  // get the values from the form
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  // fetch all users from the API
  fetch(`${USERS_BASE_URL}/users`)
    .then((response) => response.json())
    .then((data) => {
      // flag to track if user is found
      let found = false;

      // loop through all users to find a match
      data.forEach((user) => {
        if (!found) {
          // checking if email and password match
          if (user.email === email && user.password === password) {
            // save user email to session storage
            localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, email);

            // redirect to home page after login
            location.href = "index.html";

            found = true;
          }
        }
      });

      // if no match found, show error modal
      if (!found) {
        showModal("Validation error", "Incorrect credentials.");
      }
    })
    .catch((error) => console.log(error));
});

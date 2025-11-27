import { USERS_BASE_URL, SESSION_STORAGE_USER_EMAIL } from "./info.js";
import { showModal } from "./modal.js";

// Add event listener to login form
document.querySelector("#frmLogin").addEventListener("submit", (e) => {
  // Prevent default form submission
  e.preventDefault();

  // Get form input values
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();

  // Fetch all users from the API
  fetch(`${USERS_BASE_URL}/users`)
    .then((response) => response.json())
    .then((data) => {
      // Flag to track if user is found
      let found = false;

      // Loop through all users to find a match
      data.forEach((user) => {
        if (!found) {
          // Check if email and password match
          if (user.email === email && user.password === password) {
            // Save user email to session storage
            sessionStorage.setItem(SESSION_STORAGE_USER_EMAIL, email);

            // Redirect to home page
            location.href = "index.html";

            found = true;
          }
        }
      });

      // If no match found, show error modal
      if (!found) {
        showModal("Validation error", "Incorrect credentials.");
      }
    })
    .catch((error) => console.log(error));
});

import { USERS_BASE_URL } from "./info.js"; // import the URL for the users API from the info.js file

import { showModal } from "./modal.js"; // showModal function to display messages to the user after sign up

// select the signup form and add a submit event listener
document.querySelector("#frmSignup").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const email = e.target.txtEmail.value.trim(); // get the email value from the form and remove whitespace with trim
  const password = e.target.txtPassword.value.trim(); // same with password
  const repeatPassword = e.target.txtRepeatPassword.value.trim(); // and also with the repeated password

  // here we are checking if the passwords match
  if (password !== repeatPassword) {
    // show error modal if passwords don't match
    showModal("Validation error", "Both passwords must match");

    // stop the function execution
    return false;
  }

  // create a new user object with email and password
  const newUser = {
    email: email,
    password: password,
  };

  // send a POST request to create a new user in the database
  fetch(`${USERS_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    // ocnvert the response to JSON format
    .then((response) => response.json())

    // handle the successful response
    .then((data) => {
      // show success modal to the user
      showModal("Signed up", "User was created successfully", "Go to log in", "login.htm");

      // reset / clear all form fields
      e.target.reset();
    })
    // here we catch and log the errors in the console
    .catch((error) => console.log(error));
});

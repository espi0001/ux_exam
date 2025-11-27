import { USERS_BASE_URL } from "./info.js";
import { showModal } from "./modal.js";

document.querySelector("#frmSignup").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.txtEmail.value.trim();
  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();

  if (password !== repeatPassword) {
    showModal("Validation error", "Both passwords must match");
    return false;
  }

  const newUser = {
    email: email,
    password: password,
  };

  fetch(`${USERS_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => {
      showModal("Signed up", "User was created successfully");
      e.target.reset();
    })
    .catch((error) => console.log(error));
});

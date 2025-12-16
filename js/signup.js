import { USERS_BASE_URL } from "./info.js";
import { showModal } from "./modal.js";

document.querySelector("#frmSignup").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.txtEmail.value.trim().toLowerCase();
  const password = e.target.txtPassword.value.trim();
  const repeatPassword = e.target.txtRepeatPassword.value.trim();

  if (password !== repeatPassword) {
    showModal("Validation error", "Both passwords must match");
    return;
  }

  try {
    // Fetch all users
    const response = await fetch(`${USERS_BASE_URL}/users`);
    const users = await response.json();

    // Check for duplicate email
    const emailExists = users.some((user) => user.email.toLowerCase() === email);

    if (emailExists) {
      showModal("Signup failed", "This email is already registered. Please log in instead.", "Go to login", "login.htm");
      return;
    }

    // Create new user
    const newUser = { email, password };

    await fetch(`${USERS_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    showModal("Signed up", "User was created successfully", "Go to log in", "login.htm");

    e.target.reset();
  } catch (error) {
    console.error(error);
  }
});

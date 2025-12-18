export function backButton(selector = "#backBtn") {
  const backBtn = document.querySelector(selector);

  if (!backBtn) return;

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.back();
  });
}

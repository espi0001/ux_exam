export const showModal = (header, text) => {
  // Select the modal dialog element from the DOM
  const modal = document.querySelector("#mdlInfo");
  // Set the modal header text
  modal.querySelector("h1").innerText = header;
  // Set the modal body text
  modal.querySelector("p").innerText = text;
  // Display the modal dialog
  modal.showModal();
  // Select the close button inside the modal
  const closeBtn = modal.querySelector("button.close");
  // Add click event listener to close the modal when button is clicked
  closeBtn.addEventListener("click", () => {
    modal.close();
  });
};

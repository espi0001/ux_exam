export const showModal = (header, text, aTag, link) => {
  // Select the modal dialog element from the DOM
  const modal = document.querySelector("#mdlInfo");

  
  modal.querySelector("h1").innerText = header; // Set the modal header text
  modal.querySelector("p").innerText = text; // Set the modal body text

  const action = modal.querySelector("#modalAction")
  const aBtn = modal.querySelector("#modalLink")

  // show/hide action button
  if (aTag && link) {
    aBtn.textContent = aTag;
    aBtn.href = link;
    action.classList.remove("hidden");
  } else {
    action.classList.add("hidden");
  }
  
  
  modal.showModal(); // Display the modal dialog
  
  // Select the close button inside the modal
  const closeBtn = modal.querySelector("button.close");
  
  // Add click event listener to close the modal when button is clicked
  closeBtn.addEventListener("click", () => {
    modal.close();
  });
};

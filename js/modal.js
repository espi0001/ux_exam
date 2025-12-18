export const showModal = (header, text, aTag, link) => {
  const modal = document.querySelector("#mdlInfo");

  modal.querySelector("h1").innerText = header;
  modal.querySelector("p").innerText = text;

  const action = modal.querySelector("#modalAction");
  const aBtn = modal.querySelector("#modalLink");

  if (aTag && link) {
    aBtn.textContent = aTag;
    aBtn.href = link;
    action.classList.remove("hidden");
  } else {
    action.classList.add("hidden");
  }
  modal.showModal();

  const closeBtn = modal.querySelector("button.close");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
};

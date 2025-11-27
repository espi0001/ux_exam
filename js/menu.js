const burger = document.querySelector(".burger");
const navMain = document.querySelector("#navMain");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu li a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMain.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navMain.classList.remove("active");
  });
});

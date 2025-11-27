const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const main_menu = document.querySelector(".main_menu");
const links = document.querySelectorAll(".main_menu li a");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
  });
});

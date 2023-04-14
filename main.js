const burgerMenu = document.querySelector(".burger-menu");
const burgerPopup = document.querySelector(".burger-popup");
const navbar = document.querySelector(".navbar");
const noteSelector = document.querySelector(".note-selector");
const notePopup = document.querySelector(".note-popup");

// event listeners
navbar.addEventListener("click", function (e) {
  const target = e.target.classList;
  // burger popup
  if (target.contains("burger-menu")) {
    burgerPopup.classList.toggle("no-display");
  }

  // note popup
  if (target.contains("note-selector")) {
    notePopup.classList.toggle("no-display");
  }
});

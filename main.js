// burger elements
const burgerMenu = document.querySelector(".burger-menu");
const burgerPopup = document.querySelector(".burger-popup");

// navbar
const navbar = document.querySelector(".navbar");

// note elements
const noteSelector = document.querySelector(".note-selector");
const notePopup = document.querySelector(".note-popup");
const caretIcon = document.getElementById("carret-icon");

// Add note btn
const addNoteBtn = document.querySelector(".add-note-btn");

// form elements
const formContainer = document.querySelector(".form-container");
const noteTitle = document.querySelector(".note-title");
const noteMessage = document.querySelector(".note-message");
const form = document.querySelector(".form");

/////////////////////////////
/////////////////////////////
// Helper functions

const hideForm = function () {
  formContainer.classList.toggle("invisible");
  formContainer.classList.toggle("move-up");

  // resetting form inputs
  noteTitle.value = "";
  noteMessage.value = "";
};

/////////////////////////////
/////////////////////////////
// event listeners
navbar.addEventListener("click", function (e) {
  const target = e.target;
  // burger popup
  if (target.classList.contains("burger-menu")) {
    burgerPopup.classList.toggle("no-display");
  }

  // note popup
  if (target.classList.contains("note-selector")) {
    notePopup.classList.toggle("no-display");

    // changing icon if pressed
    caretIcon.classList[1] === "fi-rr-caret-down"
      ? (caretIcon.classList = "fi fi-rr-caret-up")
      : (caretIcon.classList = "fi fi-rr-caret-down");
  }
});

addNoteBtn.addEventListener("click", function () {
  hideForm();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideForm();
});

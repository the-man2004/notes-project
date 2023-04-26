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

// overlay
const overlay = document.querySelector(".overlay");

// search bar
const searchBar = document.querySelector(".search");
const cancelBtn = document.querySelector(".cancel-btn");
const searchBtn = document.querySelector(".search-btn");

// note container
const noteContainer = document.querySelector(".note-container");
const noNotes = document.querySelector(".no-notes");

///////////////////////////
///////////////////////////
// global variables

const storageName = "all-notes";
let curStorage = noteSelector.textContent
  .trim()
  .toLowerCase()
  .split(" ")
  .join("-");

let notes = [];

/////////////////////////////
/////////////////////////////
// Helper functions

const addNote = function (title, note, date, id = Math.random()) {
  noNotes.remove();
  noteContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div id="${id}" class="note-card">
      <p class="note-name">${title} <i class="fi fi-rr-arrow-small-down arrow-down"></i></p>
      <p class="note no-display">${note}</p>
      <p class="note-date">${date}</p>
      <i class="fi fi-rr-trash trash-icon"></i>
    </div>
    `
  );
};

const renderAllNotes = function (arr) {
  arr.forEach((note) => addNote(note.title, note.message, note.date, note.id));
};

const hideForm = function () {
  formContainer.classList.toggle("invisible");
  formContainer.classList.toggle("move-up");

  overlay.classList.toggle("no-display");

  // resetting form inputs
  noteTitle.value = "";
  noteMessage.value = "";
};

const hideCancelBtn = function () {
  cancelBtn.classList.add("invisible");
  searchBar.value = "";
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

    // changing icon when pressed
    caretIcon.classList[1] === "fi-rr-caret-down"
      ? (caretIcon.classList = "fi fi-rr-caret-up")
      : (caretIcon.classList = "fi fi-rr-caret-down");
  }
});

searchBar.addEventListener("keyup", function () {
  if (searchBar.value.length >= 1) {
    // remove invisibility
    cancelBtn.classList.remove("invisible");
  } else {
    // add invisibility
    cancelBtn.classList.add("invisible");
  }
});

searchBtn.addEventListener("click", function () {
  if (!searchBar.value) return;

  console.log("search");
});

cancelBtn.addEventListener("click", hideCancelBtn);

addNoteBtn.addEventListener("click", function () {
  hideForm();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const random = Math.random();
  const dateStr = `${new Date().toDateString()}`;

  notes.push({
    id: random,
    title: noteTitle.value,
    message: noteMessage.value,
    date: dateStr,
  });

  addNote(noteTitle.value, noteMessage.value, dateStr, random);
  localStorage.setItem(storageName, JSON.stringify(notes));

  console.log(JSON.parse(localStorage.getItem(storageName)));

  hideForm();
});

noteContainer.addEventListener("click", function (e) {
  // make note visible when pressed
  if (e.target.classList.contains("arrow-down")) {
    e.target.parentNode.nextElementSibling.classList.toggle("no-display");

    e.target.classList[1] === "fi-rr-arrow-small-down"
      ? (e.target.classList = "fi fi-rr-arrow-small-up arrow-down")
      : (e.target.classList = "fi fi-rr-arrow-small-down arrow-down");
  }

  // delete element when pressed
  if (e.target.classList.contains("trash-icon")) {
    // getting old notes
    const oldNotes = JSON.parse(localStorage.getItem(storageName));

    // filtering out deleted note
    const newNotes = oldNotes.filter(
      (note) => note.id !== +e.target.parentNode.id
    );

    // setting storage to new array
    localStorage.setItem(storageName, JSON.stringify(newNotes));
    notes = newNotes;

    if (newNotes.length >= 1) {
      noteContainer.innerHTML = "";
      renderAllNotes(notes);
    } else {
      noteContainer.innerHTML = `
      <div class="no-notes">
        <i class="fi fi-rr-document-signed"></i>
        <p>No notes yet :(</p>
      </div>
      `;
    }
  }
});

overlay.addEventListener("click", function () {
  hideForm();
});

window.addEventListener("load", function () {
  const local = JSON.parse(localStorage.getItem(storageName));
  local === null ? (notes = []) : (notes = local);

  if (notes.length > 0) {
    notes.forEach((note) =>
      addNote(note.title, note.message, note.date, note.id)
    );
    console.log(notes);
  } else {
    noNotes.classList.toggle("invisible");
  }
});

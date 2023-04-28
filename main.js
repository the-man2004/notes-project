// burger elements
const burgerMenu = document.querySelector(".burger-menu");
const burgerPopup = document.querySelector(".burger-popup");

// navbar
const navbar = document.querySelector(".navbar");

// note elements
const noteSelector = document.querySelector(".note-selector");
const noteCount = document.querySelector(".note-count");
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

const addNote = function (title, note, date, type, id = Math.random()) {
  noNotes.remove();
  noteContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div id="${id}" class="note-card ${type}">
      <p class="note-name">${title} <i class="fi fi-rr-arrow-small-down arrow-down"></i></p>
      <p class="note no-display">${note}</p>
      <p class="note-date">${date}</p>
      <i class="fi fi-rr-trash trash-icon"></i>
    </div>
    `
  );
};

const renderAllNotes = function (arr) {
  const array = arr.filter((note) => note.type !== "recently-deleted");

  noteContainer.innerHTML = "";
  array.forEach((note) =>
    addNote(note.title, note.message, note.date, note.type, note.id)
  );
};

const renderSpecificNotes = function (type) {
  const newNotes = notes.filter((note) => note.type === type);

  noteContainer.innerHTML = "";
  if (newNotes.length > 0) {
    newNotes.forEach((note) =>
      addNote(note.title, note.message, note.date, note.type, note.id)
    );
  } else {
    noteContainer.innerHTML = `
      <div class="no-notes">
        <i class="fi fi-rr-document-signed"></i>
        <p>No notes yet :)</p>
      </div>
    `;
  }
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

const SetNoteCount = function () {
  noteCount.textContent = `${notes.length} notes`;
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
  // if there is nothing to search
  if (!searchBar.value) return;

  const searchResult = notes.filter(
    (note) => note.title.toLowerCase() === searchBar.value.toLowerCase()
  );

  if (searchResult.length > 0) {
    noteContainer.innerHTML = "";
    searchResult.forEach((res) =>
      addNote(res.title, res.message, res.date, res.type, res.id)
    );
  } else {
    noteContainer.innerHTML = `
    <div class="no-notes">
      <i class="fi fi-rr-document-signed"></i>
      <p>No notes with that name :(</p>
    </div>
    `;
  }
});

notePopup.addEventListener("click", function (e) {
  if (e.target.classList.contains("note-link")) {
    console.log(e.target.textContent);
    noteSelector.textContent = e.target.textContent;

    curStorage = noteSelector.textContent
      .trim()
      .toLowerCase()
      .split(" ")
      .join("-");

    notePopup.classList.toggle("no-display");

    if (curStorage === "all-notes") {
      renderAllNotes(notes);
    } else {
      renderSpecificNotes(curStorage);
    }
  }
});

cancelBtn.addEventListener("click", function () {
  hideCancelBtn();

  if (curStorage === "all-notes") {
    renderAllNotes(curStorage);
  } else {
    renderSpecificNotes(curStorage);
  }
});

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
    type: curStorage,
  });

  // check if note container has no-notes
  if (
    (noteContainer.innerHTML = `
      <div class="no-notes">
        <i class="fi fi-rr-document-signed"></i>
        <p>No notes yet :(</p>
      </div>
    `)
  ) {
    noteContainer.innerHTML = "";
  }

  // addNote(noteTitle.value, noteMessage.value, dateStr, curStorage, random);
  renderSpecificNotes(curStorage);
  localStorage.setItem(storageName, JSON.stringify(notes));

  console.log(JSON.parse(localStorage.getItem(storageName)));

  // setting note count
  SetNoteCount();

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
      renderSpecificNotes(curStorage);
    } else {
      noteContainer.innerHTML = `
      <div class="no-notes">
        <i class="fi fi-rr-document-signed"></i>
        <p>No notes yet :(</p>
      </div>
      `;
    }
  }
  // setting note count
  SetNoteCount();
});

overlay.addEventListener("click", function () {
  hideForm();
});

window.addEventListener("load", function () {
  // assigning notes to = localeStorage
  const local = JSON.parse(localStorage.getItem(storageName));
  local === null ? (notes = []) : (notes = local);

  // setting note count
  SetNoteCount();

  if (notes.length > 0) {
    renderAllNotes(notes);
    console.log(notes);
  } else {
    noNotes.classList.toggle("invisible");
  }
});

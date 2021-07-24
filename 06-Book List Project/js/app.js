const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookId = document.querySelector("#book-id");
const submitBtn = document.querySelector(".btn");
const outputClass = document.querySelector(".output");
const inputClass = document.querySelector(".input");
const closeBook = document.getElementsByClassName("close");

//Enter key action
bookId.addEventListener("keypress", enterKey);

function enterKey(e) {
  // console.log(e);
  if (e.key == "Enter") {
    console.log("enter");
    addBook();
  }
}

//Addbook action
submitBtn.addEventListener("click", addBook);

function addBook() {
  if (bookTitle.value == "" || bookAuthor.value == "" || bookId == "") {
    showMessage("Please input all fiel!", "red");
  } else {
    var newRow = document.createElement("div");
    newRow.className = "row";

    var newTitle = document.createElement("p");
    newTitle.className = "output-title";
    newTitle.appendChild(document.createTextNode(bookTitle.value));

    var newAuthor = document.createElement("p");
    newAuthor.className = "output-author";
    newAuthor.appendChild(document.createTextNode(bookAuthor.value));

    var newId = document.createElement("p");
    newId.className = "output-id";
    newId.appendChild(document.createTextNode(bookId.value));

    var newClose = document.createElement("p");
    newClose.className = "close";
    newClose.innerHTML = '<a href="#">X</a>';

    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newId);
    newRow.appendChild(newClose);
    outputClass.appendChild(newRow);
    saveData();
    bookTitle.value = "";
    bookAuthor.value = "";
    bookId.value = "";
    showMessage("Book Added", "green");
  }
}

// Message Fucntion

///Show Mess
function showMessage(mess, color) {
  if (inputClass.children[1].classList.contains("mess")) {
    inputClass.children[1].remove();
    const newPMess = document.createElement("p");
    newPMess.className = "mess";
    inputClass.insertBefore(newPMess, inputClass.children[1]);
    newPMess.style.backgroundColor = color;
    newPMess.innerHTML = mess;
    setTimeout(function () {
      newPMess.remove();
    }, 3000);
  } else {
    const newPMess = document.createElement("p");
    newPMess.className = "mess";
    inputClass.insertBefore(newPMess, inputClass.children[1]);
    newPMess.style.backgroundColor = color;
    newPMess.innerHTML = mess;
    setTimeout(function () {
      newPMess.remove();
    }, 3000);
  }
}

//Remove book
outputClass.addEventListener("click", removeBook);

function removeBook(e) {
  if (e.target.parentElement.classList.contains("close")) {
    e.target.parentElement.parentElement.remove();
    showMessage("Book Removed", "red");

    // Remove index

    // console.log(e.target.parentElement.parentElement.children[2].innerHTML);
    // console.log(outputClass);
    removeDataBook(e.target.parentElement.parentElement.children[2].innerHTML);
  }
  // console.log(e.target.parentElement.classList.contains("close"));
}

//Local Storage
function saveData() {
  var dataBooks;
  if (localStorage.getItem("databooks") == null) {
    dataBooks = [];
  } else {
    dataBooks = JSON.parse(localStorage.getItem("databooks"));
  }
  dataBooks.push({
    title: bookTitle.value,
    author: bookAuthor.value,
    idbook: bookId.value,
  });
  dataBooks = JSON.stringify(dataBooks);
  localStorage.setItem("databooks", dataBooks);
}

//Get Data from LS
document.addEventListener("DOMContentLoaded", getDataBooks);

function getDataBooks(title, author, idbook) {
  var dataBooks;
  if (localStorage.getItem("databooks") == null) {
    dataBooks = [];
  } else {
    dataBooks = JSON.parse(localStorage.getItem("databooks"));
  }
  dataBooks.forEach(function (Obj) {
    var newRow = document.createElement("div");
    newRow.className = "row";

    var newTitle = document.createElement("p");
    newTitle.className = "output-title";
    newTitle.appendChild(document.createTextNode(Obj.title));

    var newAuthor = document.createElement("p");
    newAuthor.className = "output-author";
    newAuthor.appendChild(document.createTextNode(Obj.author));

    var newId = document.createElement("p");
    newId.className = "output-id";
    newId.appendChild(document.createTextNode(Obj.idbook));

    var newClose = document.createElement("p");
    newClose.className = "close";
    newClose.innerHTML = '<a href="#">X</a>';

    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newId);
    newRow.appendChild(newClose);
    outputClass.appendChild(newRow);
  });
}

//Remove data from LS
function removeDataBook(e) {
  var dataBooks;
  if (localStorage.getItem("databooks") == null) {
    dataBooks = [];
  } else {
    dataBooks = JSON.parse(localStorage.getItem("databooks"));
  }
  dataBooks.forEach(function (Obj, index) {
    if (Obj.idbook == e) {
      dataBooks.splice(index, 1);
      console.log(Obj.idbook);
    }
  });
  dataBooks = JSON.stringify(dataBooks);
  localStorage.setItem("databooks", dataBooks);
  // console.log(dataBooks);
}

//Valiadtion

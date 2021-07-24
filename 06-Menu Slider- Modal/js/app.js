var hamburgerClick = document.querySelector(".hamburger");
var header = document.querySelector(".header");
var container = document.querySelector(".container");

hamburgerClick.addEventListener("click", showMenu);

function showMenu() {
  header.classList.toggle("show-header");
  container.classList.toggle("resize-container");
}

//Modal

var signUp = document.querySelector(".signup");
var form = document.querySelector("form");
var modal = document.querySelector(".modal");

signUp.addEventListener("click", showModal);

function showModal() {
  modal.style.visibility = "visible";
  form.classList.add("show-form");
}

//Close Modal

var closeModal = document.querySelector(".close");

closeModal.addEventListener("click", closeModalFunc);

function closeModalFunc() {
  modal.style.visibility = "hidden";
  form.classList.remove("show-form");
}

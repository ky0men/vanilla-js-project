var seatClick = document.querySelector(".seats");
var moviePicked = document.querySelector("#pick-movie");
var selectedSeat = document.querySelector("#selected-seat");
var totalPrice = document.querySelector("#total-price");

//Event chose seat
seatClick.addEventListener("click", choseSeat);

function choseSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    changePrice();
    saveData();
  }
}

//Event change film
moviePicked.addEventListener("change", changePrice);

function changePrice() {
  var chosedSeat = document.querySelectorAll(".row .selected");
  var chosedSeatQuantity = chosedSeat.length;
  var price = moviePicked.value * chosedSeatQuantity;
  // Display ticket quantity and cost
  selectedSeat.innerText = chosedSeatQuantity;
  totalPrice.innerText = price;
}

//Local storage
function saveData() {
  //Save seat
  var allSeat = document.querySelectorAll(".seats .seat");
  var chosedSeat = document.querySelectorAll(".row .selected");
  var indexSeat = [...chosedSeat].map(function (seat) {
    return [...allSeat].indexOf(seat);
  });
  console.log(indexSeat);
  localStorage.setItem("selectedTicket", JSON.stringify(indexSeat));
}

// Save film
moviePicked.addEventListener("change", saveFilm);

function saveFilm(e) {
  console.log(e.target.selectedIndex);
  var seletedFilmIndex = e.target.selectedIndex;
  localStorage.setItem("selectedFilm", seletedFilmIndex);
}

//Take data from LocalStorage
document.addEventListener("DOMContentLoaded", takeAndDisplay);

function takeAndDisplay() {
  var ticket = JSON.parse(localStorage.getItem("selectedTicket"));
  var allSeat = document.querySelectorAll(".seats .seat");

  ticket.forEach(function (index) {
    allSeat[index].classList.add("selected");
  });
  changePrice();
  var filmIndex = localStorage.getItem("selectedFilm");
  moviePicked.selectedIndex = filmIndex;
}

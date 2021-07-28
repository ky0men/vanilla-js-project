// var flashCard = [
//   {
//     question: "Name",
//     answer: "Ten",
//   },
//   {
//     question: "Beer",
//     answer: "Bia",
//   },
//   {
//     question: "Keyborad",
//     answer: "Ban Phim",
//   },
// ];

var cardEl = [];
var card = document.querySelector(".card");
//Get cards
function getCards() {
  flashCard.forEach(function (data, index) {
    displayCard(data, index);
  });
}
//View card to DOM

function displayCard(data, index) {
  var newDiv = document.createElement("div");
  newDiv.className = "card-inner";
  if (index == 0) {
    newDiv.classList.add("active");
  }
  newDiv.innerHTML = `
  <div class="card-front">
    <p class="card-question">${data.question}</p>
  </div>
  <div class="card-back">
    <p class="card-answer">${data.answer}</p>
  </div>
  `;
  cardEl.push(newDiv);

  card.appendChild(newDiv);
}

// getCards();

//Flip card

card.addEventListener("click", flipCard);
function flipCard() {
  cardEl.forEach(function (card) {
    if (card.classList.contains("active")) {
      card.classList.toggle("rotate");
    }
  });
}

//View panigation
var currentPage = 0;
var page = document.querySelector(".page");
function updatePage() {
  page.innerHTML = `${currentPage + 1}/${cardEl.length}`;
}
// updatePage();

//Next Button
var nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", nextCard);

function nextCard() {
  cardEl.forEach(function (card, index) {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      if (index < cardEl.length - 1) {
        currentPage = index + 1;
      }
      if (index == cardEl.length - 1) {
        currentPage = 0;
      }
    }
  });
  cardEl[currentPage].classList.add("active");
  updatePage();
}

//Prev Button
var prevBtn = document.querySelector(".prev-btn");
prevBtn.addEventListener("click", prevCard);
function prevCard() {
  cardEl.forEach(function (card, index) {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      if (index > 0) {
        currentPage = index - 1;
      }
      if (index == 0) {
        currentPage = cardEl.length - 1;
      }
    }
  });
  cardEl[currentPage].classList.add("active");
  updatePage();
}

//Show Modal
var addNewCardBtn = document.querySelector(".add-new-btn");
addNewCardBtn.addEventListener("click", showModal);
var cardModal = document.querySelector(".add-card-modal");

function showModal() {
  cardModal.classList.add("show");
  document.querySelector("#question").value = "";
  document.querySelector("#answer").value = "";
}
//Close Modal
var closeModalBtn = document.querySelector(".close-modal");
closeModalBtn.addEventListener("click", closeModal);
function closeModal() {
  cardModal.classList.remove("show");
}
//Add new Card
var addCardSubmit = document.querySelector(".add-card-submit");
addCardSubmit.addEventListener("click", addCard);

function addCard(e) {
  e.preventDefault();
  var question = document.querySelector("#question").value;
  var answer = document.querySelector("#answer").value;
  console.log(currentPage);
  cardEl.forEach(function (card, index) {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
    }
  });
  currentPage = cardEl.length;
  var newDiv = document.createElement("div");
  newDiv.className = "card-inner active";
  newDiv.innerHTML = `
  <div class="card-front">
    <p class="card-question">${question}</p>
  </div>
  <div class="card-back">
    <p class="card-answer">${answer}</p>
  </div>
  `;
  cardEl.push(newDiv);

  card.appendChild(newDiv);
  saveCard(question, answer);
  updatePage();

  closeModal();
}

//Clear Card
var clearCardBtn = document.querySelector(".clear");
clearCardBtn.addEventListener("click", clearCard);
function clearCard() {
  cardEl[currentPage].remove();
  cardEl.splice(currentPage, 1);
  removeData();
  if (cardEl.length == 0) {
    page.innerHTML = `0/0`;
  } else if ((currentPage = cardEl.length - 1)) {
    prevCard();
  } else {
    nextCard();
  }
  // updatePage();
}

//Save data to LS

function saveCard(question, answer) {
  if (localStorage.getItem("flashCard") === null) {
    flashCard = [];
  } else {
    flashCard = JSON.parse(localStorage.getItem("flashCard"));
  }
  data = {
    question: question,
    answer: answer,
  };
  flashCard.push(data);
  localStorage.setItem("flashCard", JSON.stringify(flashCard));
}

//Get data from LS
document.addEventListener("DOMContentLoaded", getDataCard);
function getDataCard() {
  if (localStorage.getItem("flashCard") === null) {
    flashCard = [];
  } else {
    flashCard = JSON.parse(localStorage.getItem("flashCard"));
  }
  getCards();
  if (flashCard.length == 0) {
    page.innerHTML = `0/0`;
  } else {
    page.innerHTML = `${currentPage + 1}/${flashCard.length}`;
  }
}

//Remove data in LS

function removeData() {
  if (localStorage.getItem("flashCard") === null) {
    flashCard = [];
  } else {
    flashCard = JSON.parse(localStorage.getItem("flashCard"));
  }
  flashCard.splice(currentPage, 1);
  localStorage.setItem("flashCard", JSON.stringify(flashCard));
}

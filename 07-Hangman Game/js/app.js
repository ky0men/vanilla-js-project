const word = [
  "application",
  "javascript",
  "freecourse",
  "hangmangame",
  "hello",
  "baxadethuong",
  "mylove",
  "welcomehome",
];
var overlay = document.querySelector(".overlay");
var selectWord = word[Math.floor(Math.random() * word.length)];

console.log(selectWord);

var correctLetter = [];
var wrongLetter = [];

var wordClass = document.querySelector(".word");
// var letterOut = document.querySelectorAll(".letter");
function displayWord() {
  wordClass.innerHTML = `
    ${selectWord
      .split("")
      .map(function (letter) {
        return `
      <div class="letter">${correctLetter.includes(letter) ? letter : ""}</div>
      `;
      })
      .join("")}
  `;
  var innerWord = wordClass.innerText.replace(/\n/g, "");
  if (innerWord === selectWord) {
    overlay.style.display = "block";
    document.querySelector(".popup h3").innerText = "Congratulation You Won!";
  }
}
displayWord();

window.addEventListener("keydown", checkKey);
// function checkKey(e) {
//   if (e.keyCode >= 65 && e.keyCode <= 90) {
//     console.log(e.keyCode);
//   }
// }

function checkKey(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (!correctLetter.includes(e.key) && selectWord.includes(e.key)) {
      correctLetter.push(e.key);
      showNotification("Correct Letter!");
      displayWord();
    } else if (correctLetter.includes(e.key)) {
      showNotification("Letter is chosed!");
    } else if (!wrongLetter.includes(e.key)) {
      wrongLetter.push(e.key);
      showNotification("Wrong Letter!");
      showWrongLetter(e.key);
      showMan();
    } else {
      showNotification("Don't chose wrong letter twice!");
    }
  } else {
    showNotification("Plese input letter only!");
  }
}
//Show man part
var manPart = document.querySelectorAll(".man-figure");

function showMan() {
  manPart.forEach(function (part, index) {
    var error = wrongLetter.length;
    if (index < error) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongLetter.length == 6) {
    gameOver();
  }
}
//Game over
function gameOver() {
  overlay.style.display = "block";
  document.querySelector(".popup h3").innerText = "Game Over!";
}
//Show notification
var finalMessage = document.querySelector(".alert-mess");
function showNotification(mess) {
  finalMessage.innerText = mess;
  finalMessage.classList.add("show");
  setTimeout(function () {
    finalMessage.classList.remove("show");
  }, 2000);
}

//Show Wrong Letter
var wrongOuputLetter = document.querySelector(".input-text");

function showWrongLetter() {
  wrongOuputLetter.innerHTML = `
  Wrong Letter Chosed: ${wrongLetter.map(function (charater) {
    return charater;
  })}
  `;
}

//Play again
var playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", playContinue);

function playContinue() {
  console.log("play again!");
  overlay.style.display = "none";
  correctLetter.splice(0);
  wrongLetter.splice(0);
  selectWord = word[Math.floor(Math.random() * word.length)];
  displayWord();
  showWrongLetter();
  showMan();
}

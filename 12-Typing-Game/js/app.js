var word = [
  "world",
  "hello",
  "home",
  "goodbye",
  "speed",
  "drive",
  "shopping",
  "website",
  "programing",
  "Java",
  "coding",
  "computer",
  "aptech",
  "frontend",
  "backend",
];

//Setting Button
var settingBtn = document.querySelector(".setting-btn");
var difficultyBoard = document.querySelector(".difficulty");
settingBtn.addEventListener("click", showSetting);

function showSetting() {
  difficultyBoard.classList.toggle("show");
}

//Get word
var wordOutput = document.querySelector(".word");
function getWord() {
  var randomIndex = Math.floor(Math.random() * word.length);
  // console.log(word[randomIndex]);
  wordOutput.innerText = word[randomIndex];
}
getWord();

//Typing
var inputType = document.querySelector(".input-type");

inputType.addEventListener("input", checkType);

function checkType() {
  if (inputType.value === wordOutput.innerText) {
    time += timePlus;
    score++;
    updateScore();
    getWord();
    inputType.value = "";
  }
}

//Timing count
var timeInterval;
inputType.addEventListener("focus", function () {
  timeInterval = setInterval(updateTime, 1000);
});
var time = 5;
var timePlus = 5;
var score = 0;
var timeOutput = document.querySelector(".time");
function updateTime() {
  time--;
  timeOutput.innerHTML = `Time left: ${time}s`;
  if (time == 0) {
    gameOver();
    clearInterval(timeInterval);
  }
}
//Update score
function updateScore() {
  document.querySelector(".score").innerHTML = `Score: ${score}`;
}
//Game over
var container = document.querySelector(".container");
function gameOver() {
  container.innerHTML = `
  <h1>Game Over</h1>
  <h3>Your score is: ${score}</h3>
  <button onclick="location.reload()">Reload</button>
  `;
}

//Difficulty

var difficultyChose = document.querySelector("#difficul-chose");

difficultyChose.addEventListener("change", changeMode);

function changeMode(e) {
  console.log(e.target.value);
  if (e.target.value == "easy") {
    time = 10;
    timePlus = 5;
    timeOutput.innerHTML = `Time left: ${time}s`;
  } else if (e.target.value == "medium") {
    time = 7;
    timePlus = 3;
    timeOutput.innerHTML = `Time left: ${time}s`;
  } else {
    time = 5;
    timePlus = 2;
    timeOutput.innerHTML = `Time left: ${time}s`;
  }
}

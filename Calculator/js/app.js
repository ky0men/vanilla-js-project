var inputArea = document.querySelector("textarea");

inputArea.addEventListener("keyup", calculate);

//Calculate
var result = 0;
function calculate(e) {
  console.log(e.key);
}

var numClick = document.querySelectorAll("li[data-btn]");
var printNum = "";

numClick.forEach(function (num) {
  num.addEventListener("click", addNum);
  function addNum(e) {
    if (e.target.classList.contains("fas")) {
      // console.log(e.target.parentElement.getAttribute("data-btn"));
      printNum = printNum.concat(
        e.target.parentElement.getAttribute("data-btn")
      );
    } else {
      // console.log(e.target.getAttribute("data-btn"));
      printNum = printNum.concat(e.target.getAttribute("data-btn"));
    }
    inputArea.innerText = printNum;
  }
});

var resultField = document.querySelector(".result");
var equaBtn = document.querySelector(".equa");
equaBtn.addEventListener("click", showResult);
var result;

function showResult() {
  // console.log(eval(printNum));
  result = eval(printNum);
  resultField.innerText = result;
  printNum = `${result}`;
}

//Clear

var clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearAll);

function clearAll() {
  inputArea.innerText = "0";
  printNum = "";
  resultField.innerText = "";
}

//Plus/Minus

var changeValue = document.querySelector(".change-value");
changeValue.addEventListener("click", changeOutValue);

function changeOutValue() {
  printNum = printNum / -1;
  inputArea.innerText = printNum;
  showResult();
}

//Percent
var percentBtn = document.querySelector(".percent");
percentBtn.addEventListener("click", percentCal);

function percentCal() {
  result = result / 100;
  resultField.innerText = result;
  printNum = `${result}`;
}

//Dark Mode

var modeToggle = document.querySelector(".mode-toggle");

modeToggle.addEventListener("click", changeMode);

function changeMode(e) {
  console.log(e.target);
  if (e.target.classList.contains("fa-sun")) {
    document.querySelector(".fa-sun").style.cssText =
      "opacity: 1; color: black";
    document.querySelector(".fa-moon").style.cssText = "color: black";
    document.querySelector(".mode-toggle").style.backgroundColor = "whitesmoke";

    document.querySelector(".container").style.backgroundColor = "white";
  }
}

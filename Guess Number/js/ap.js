const guessedNum = document.querySelector(".input-number");
const subButton = document.querySelector(".submit");
const result = document.querySelector(".result");
const again = document.querySelector(".again");

subButton.addEventListener("click", guess);
var targetNumber = Math.floor(Math.random() * 10 + 1);

again.style.display = "none";
function correctAns() {
  result.innerHTML = "";
  result.appendChild(
    document.createTextNode(guessedNum.value + " is correct!")
  );
  result.style.color = "blue";
  again.style.display = "inline-block";
  subButton.style.display = "none";
  guessedNum.value = "";
}
let i = 3;

function guess() {
  console.log(targetNumber);
  // console.log("i truoc" + i);
  if (guessedNum.value == "") {
    result.appendChild(
      document.createTextNode("Please input your guess number")
    );
    result.style.color = "green";
  } else {
    while (i > 0) {
      if (guessedNum.value == targetNumber) {
        correctAns();
        break;
      } else {
        result.innerHTML = "";
        result.appendChild(
          document.createTextNode(
            guessedNum.value +
              " is not correct! you have " +
              (i - 1) +
              " guesses left"
          )
        );
        result.style.color = "red";
        guessedNum.value = "";

        i--;
        break;
      }
    }
    // console.log(i);
    if (i == 0) {
      result.innerHTML = "";
      result.appendChild(
        document.createTextNode(
          "Sorry, game over, the correct answer was " + targetNumber
        )
      );
      result.style.color = "red";
      guessedNum.value = "";

      again.style.display = "inline-block";
      subButton.style.display = "none";
    }
  }
}
//Play Again

again.addEventListener("click", playAgain);
function playAgain() {
  again.style.display = "none";
  subButton.style.display = "inline-block";
  result.innerHTML = "";

  targetNumber = Math.floor(Math.random() * 10 + 1);
  i = 3;

  // console.log(targetNumber);
  guess();
  // guess();
}

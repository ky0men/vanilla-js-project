const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

var textImgBox = document.querySelector(".text-img-box");

function loadTextImgBox() {
  data.forEach(function (content) {
    var newDiv = document.createElement("div");
    newDiv.className = "card";
    var output = `
    <img src="${content.image}">
    <p class="text-content">${content.text}</p>
  `;
    newDiv.innerHTML = output;
    newDiv.addEventListener("click", function () {
      readTextCard(content.text);
    });
    textImgBox.appendChild(newDiv);
  });
}
loadTextImgBox();

//Toggle Text Box
var toggleBtn = document.querySelector(".btn-toggle");
var textBox = document.querySelector(".text-box");
var closeTextBoxBtn = document.querySelector(".text-box .close");

toggleBtn.addEventListener("click", toggleTextBox);
function toggleTextBox() {
  textBox.classList.toggle("show");
}

closeTextBoxBtn.addEventListener("click", closeTextBox);
function closeTextBox() {
  textBox.classList.remove("show");
}

//Get option voices
var selectVoice = document.getElementById("select-voice");

function getWebVoices() {
  var voices = speechSynthesis.getVoices();
  voices.forEach(function (voice, index) {
    var option = document.createElement("option");
    option.textContent = `${voice.name} - ${voice.lang}`;
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);
    option.value = index;
    selectVoice.appendChild(option);
    // console.log(voice);
  });
}
getWebVoices();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = getWebVoices;
}

//Read text from input
var inputText = document.querySelector("#input-text");
var readTextBtn = document.querySelector(".read-text");

readTextBtn.addEventListener("click", readTextFromInput);

function readTextFromInput(e) {
  e.preventDefault();
  var voices = speechSynthesis.getVoices();

  var utterThis = new SpeechSynthesisUtterance(inputText.value);
  utterThis.voice = voices[selectVoice.value];
  window.speechSynthesis.speak(utterThis);
}

//Read text from image box

function readTextCard(text) {
  var voices = speechSynthesis.getVoices();

  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices[selectVoice.value];
  window.speechSynthesis.speak(utterThis);
}

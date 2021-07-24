var newArr = [];
function randomUsers() {
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
      getUser(data);
      renderUser();
    });
}

randomUsers();
randomUsers();

//GetUser
function getUser(user) {
  var newUser = {
    name: `${user.results[0].name.first} ${user.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  newArr.push(newUser);
  console.log(newArr);
}

//Render User
var outputDisplay = document.querySelector(".output-display");
function renderUser() {
  var output = "";
  newArr.forEach(function (user) {
    output += `
      <div class="output-user">
        <div class="name">${user.name}</div>
        <div class="money">$ ${formatMoney(user.money)}</div>
      </div>
    `;
  });
  outputDisplay.innerHTML = output;
}

//Format noney view
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Add user
var addUserClick = document.querySelector(".add-user");

addUserClick.addEventListener("click", addUser);

function addUser() {
  randomUsers();
  console.log(newArr);
}

//Double Money

var doubleMoneyClick = document.querySelector(".double-money");
doubleMoneyClick.addEventListener("click", doubleMoney);

function doubleMoney() {
  newArr = newArr.map(function (user) {
    return { ...user, money: user.money * 2 };
  });
  renderUser();
}

//Show Millionare

var showMillionareClick = document.querySelector(".show-millionare");
showMillionareClick.addEventListener("click", showMill);

function showMill() {
  newArr = newArr.filter(function (user) {
    return user.money >= 1000000;
  });
  renderUser();
}

//Sort by Richest

var sortRichClick = document.querySelector(".sort-rich");
sortRichClick.addEventListener("click", sortRichest);

function sortRichest() {
  newArr.sort(function (a, b) {
    return b.money - a.money;
  });
  renderUser();
}

// Calculate sum

var calculateSumClick = document.querySelector(".cal-sum");
var totalOutput = document.querySelector(".total");
calculateSumClick.addEventListener("click", calSum);
function calSum() {
  var sum = newArr.reduce(function (total, user) {
    return (total += user.money);
  }, 0);
  var newTotal = `
      <p><span>Sumary: </span>$ ${formatMoney(sum)}</p>
  `;
  totalOutput.innerHTML = newTotal;
}

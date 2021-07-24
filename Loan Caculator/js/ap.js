const amount = document.querySelector(".amount");
const interest = document.querySelector(".percent");
const year = document.querySelector(".payment-year");
const calculator = document.querySelector("#calculator");
const container = document.querySelector(".container");
const output = document.getElementsByClassName("output");
const row = document.getElementsByClassName("row");

//Check input number
amount.addEventListener("blur", checkAmountNumber);
interest.addEventListener("blur", checkInterNumber);
year.addEventListener("blur", checkYearNumber);

function checkAmountNumber() {
  let amountNumber = amount.value / 1;

  if (isNaN(amountNumber)) {
    amount.style.boxShadow = "0 0 5px red";
    alert("Hãy nhập số tiền cần vay là số!");
  } else {
    amount.style.boxShadow = "0 0 4px green";
  }
  // console.log(amountNumber);
}
function checkInterNumber() {
  let interestNumber = interest.value / 1;

  if (isNaN(interestNumber)) {
    interest.style.boxShadow = "0 0 5px red";
    alert("Hãy nhập phần trăm lãi là số!");
  } else {
    interest.style.boxShadow = "0 0 4px green";
  }
}
function checkYearNumber() {
  let yearNumber = year.value / 1;

  if (isNaN(yearNumber)) {
    year.style.boxShadow = "0 0 5px red";
    alert("Hãy nhập năm vay là số!");
  } else {
    year.style.boxShadow = "0 0 4px green";
  }
}

const outputContainer = document.createElement("div");
outputContainer.className = "output-container";

const h3 = document.createElement("h3");
h3.innerText = "Kết quả";

const row1 = document.createElement("div");
row1.className = "row";

const symbol1 = document.createElement("div");
symbol1.className = "symbol";
symbol1.innerHTML = "Số tiền trả hàng tháng";

const output1 = document.createElement("div");
output1.className = "output";
output1.innerHTML = "Hello";

row1.appendChild(symbol1);
row1.appendChild(output1);

const row2 = document.createElement("div");
row2.className = "row";

const symbol2 = document.createElement("div");
symbol2.className = "symbol";
symbol2.innerHTML = "Tổng số tiền cần trả";

const output2 = document.createElement("div");
output2.className = "output";
output2.innerHTML = "";

row2.appendChild(symbol2);
row2.appendChild(output2);

const row3 = document.createElement("div");
row3.className = "row";

const symbol3 = document.createElement("div");
symbol3.className = "symbol";
symbol3.innerHTML = "Tổng lãi cần trả";

const output3 = document.createElement("div");
output3.className = "output";
output3.innerHTML = "";

row3.appendChild(symbol3);
row3.appendChild(output3);

calculator.addEventListener("click", calcu);

function calcu() {
  if (amount.value == "" && interest.value == "" && year.value == "") {
    alert("Hãy nhập dữ liệu rồi hẵn nhấn tính toán!");
    amount.style.boxShadow = "0 0 5px red";
    interest.style.boxShadow = "0 0 5px red";
    year.style.boxShadow = "0 0 5px red";
  }
  let monthlyPayment =
    (Number(amount.value) * Number(interest.value)) / 1200 +
    Number(amount.value) / (Number(year.value) * 12);
  let totalPayment = monthlyPayment * Number(year.value) * 12;
  let totalInter = totalPayment - Number(amount.value);

  row1.children[1].innerHTML = "";
  row2.children[1].innerHTML = "";
  row3.children[1].innerHTML = "";

  output1.appendChild(document.createTextNode(monthlyPayment.toFixed(3)));
  output2.appendChild(document.createTextNode(totalPayment.toFixed(3)));
  output3.appendChild(document.createTextNode(totalInter.toFixed(3)));

  outputContainer.appendChild(h3);
  outputContainer.appendChild(row1);
  outputContainer.appendChild(row2);
  outputContainer.appendChild(row3);
  container.appendChild(outputContainer);
}

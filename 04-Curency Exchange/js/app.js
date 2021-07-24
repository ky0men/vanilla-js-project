var currencyOne = document.querySelector("#money-one");
var currencyOneInput = document.querySelector("#input-currency-1");
var currencyTwo = document.querySelector("#money-two");
var outDisplayRate = document.querySelector(".exchange-rate");
var outDisplayCurrencyTwo = document.querySelector("#output-currency-2");
var swapClick = document.querySelector(".swap-btn");

currencyOne.addEventListener("change", exchange);
currencyTwo.addEventListener("change", exchange);
currencyOneInput.addEventListener("change", exchange);

function exchange() {
  fetch(
    `https://v6.exchangerate-api.com/v6/b7a83f0bb39e58b0df187781/latest/${currencyOne.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      var outputRate = data.conversion_rates[currencyTwo.value];
      var ouputCurrencyTwo = currencyOneInput.value * outputRate;
      //Display
      outDisplayRate.innerText = `Exchange rate: ${outputRate}`;
      outDisplayCurrencyTwo.innerText = ouputCurrencyTwo;
    });
}

//Swap currency

swapClick.addEventListener("click", swapCurrency);

function swapCurrency() {
  var temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  exchange();
}

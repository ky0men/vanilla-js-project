//Search meal by name
var searchBtn = document.querySelector(".search");
var randomBtn = document.querySelector(".random");
var inputMeal = document.querySelector(".input-meal");
var resultSearch = document.querySelector(".result");
var mealThumb = document.querySelector(".meal-thumbnail");
var mealInstruction = document.querySelector(".meal-instruction");

searchBtn.addEventListener("click", searchMeal);
function searchMeal(e) {
  // console.log(inputMeal.value);
  mealInstruction.innerHTML = "";
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resultSearch.innerHTML = `
      Result for <span>${inputMeal.value}</span>:`;
      var output = "";
      data.meals.forEach(function (meal) {
        output += `
        <div class="meal" id-meal="${meal.idMeal}">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}" id-meal="${meal.idMeal}">
          <div class="name" id-meal="${meal.idMeal}">${meal.strMeal}</div>
        </div>
        `;
      });
      mealThumb.innerHTML = output;
    });
  e.preventDefault();
}

mealThumb.addEventListener("click", showMealDetail);

function showMealDetail(e) {
  // console.log(e.target.getAttribute("id-meal"));
  var idMeal = e.target.getAttribute("id-meal");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => response.json())
    .then((data) => {
      var meal = data.meals[0];
      updateIngredients(meal);
      showIngredient(meal);
      console.log(meal);
    });
}

var ingredients = [];
var measure = [];

function updateIngredients(meal) {
  ingredients = [];
  measure = [];
  for (var i = 1; i < 20; i++) {
    if (
      meal[`strIngredient${i}`] !== "" &&
      meal[`strIngredient${i}`] !== null
    ) {
      ingredients.push(meal[`strIngredient${i}`]);
      measure.push(meal[`strMeasure${i}`]);
    } else {
      break;
    }
  }
  console.log(ingredients);
  console.log(measure);
}

function showIngredient(meal) {
  mealInstruction.classList.add("show");
  mealInstruction.innerHTML = `
    <h2 class="meal-name">${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3 class="meal-country">Meal from ${meal.strArea}</h3>
    <p class="decription">${meal.strInstructions}</p>
    <h3>Ingredients</h3>
    <div class="measure-meal"></div>
  `;
  var measureMeal = document.querySelector(".measure-meal");
  var ouputMeasure = "";
  for (var i = 0; i < ingredients.length; i++) {
    ouputMeasure += `
      <span>${ingredients[i]} - ${measure[i]}</span>
  `;
  }
  measureMeal.innerHTML = ouputMeasure;
}

//Random meal
randomBtn.addEventListener("click", randomMeal);

function randomMeal() {
  mealThumb.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      var meal = data.meals[0];
      updateIngredients(meal);
      showIngredient(meal);
    });
}

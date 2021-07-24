class Weather {
  constructor() {
    this.apiKey = "cfad47341ed049cd79bbc020038e290e";
  }
  getWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        ui.displayContent(data);
      })
      .catch((err) => console.log(err));
  }
}

class UI {
  constructor() {
    this.localtion = document.querySelector(".location");
    this.cloud = document.querySelector(".cloud");
    this.degree = document.querySelector(".degree");
    this.icon = document.querySelector(".icon");
    this.localtion = document.querySelector(".location");
    this.feel = document.querySelector(".feels-like");
    this.humidity = document.querySelector(".humidity");
    this.wind = document.querySelector(".wind");
  }
  displayContent(data) {
    this.localtion.innerText = `${data.name}, ${data.sys.country}`;
    this.cloud.innerText = data.weather[0].description;
    this.degree.innerHTML = `${Math.round(data.main.temp)} độ C`;
    this.icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    this.feel.innerHTML = `Cảm giác thực: ${Math.round(
      data.main.feels_like
    )} độ C`;
    this.humidity.innerHTML = `Độ ẩm: ${data.main.humidity}% `;
    this.wind.innerHTML = `Tốc độ gió ${data.wind.speed} m/giây`;
  }
}
var city = "da nang";

const weather = new Weather();
weather.getWeather(city);
const ui = new UI();

//Change location
var inputLocation = document.querySelector(".input-location");
var changeClick = document.querySelector(".change-btn");

changeClick.addEventListener("click", changeLocation);

function changeLocation() {
  city = inputLocation.value;
  weather.getWeather(city);

  //Close Modal
  $("#changeLocationModal").modal("hide");

  //Localstorage localtion
  // locationCity = JSON.stringify(city);
  localStorage.setItem("city", city);
}

//Restore location frome storage

document.addEventListener("DOMContentLoaded", () => {
  var newCity = localStorage.getItem("city");
  // console.log(newCity);
  weather.getWeather(newCity);
});

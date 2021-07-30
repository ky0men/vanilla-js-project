var container = document.querySelector(".container");
var text = document.querySelector(".text");
function animation() {
  container.className = "container zoom-in";
  text.innerHTML = "Breath In";
  setTimeout(function () {
    text.innerHTML = "Hold";
    setTimeout(function () {
      container.className = "container zoom-out";
      text.innerHTML = "Breath Out";
    }, 1500);
  }, 3000);
}

animation();
setInterval(animation, 7500);

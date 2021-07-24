var songs = [
  "thangtulaloinoidoicuaem",
  "loinho",
  "henyeu",
  "chilakhongcungnhau",
];
var songTitle = document.querySelector(".song-title");
var songImg = document.querySelector(".song-img img");
var audio = document.querySelector("audio");
var songInfo = document.querySelector(".song-info");

//Load song
var indexSong = 0;
loadSong(songs[indexSong]);

function loadSong(song) {
  switch (song) {
    case "thangtulaloinoidoicuaem":
      songTitle.innerText = "Tháng tư là lời nói dối của em - HAT";
      break;
    case "loinho":
      songTitle.innerText = "Lối nhỏ - Đen Vâu";
      break;
    case "henyeu":
      songTitle.innerText = "Hẹn Yêu";
      break;
    case "chilakhongcungnhau":
      songTitle.innerText = "Chỉ là không cùng nhau - Tăng Phúc";
      break;
  }
  songImg.src = `imgs/${song}.jpg`;
  audio.src = `music/${song}.mp3`;
}

//Click play
var playClick = document.querySelector(".play-btn");
playClick.addEventListener("click", playSong);

function playSong(e) {
  // console.log(e.target.classList.contains("fa-play"));
  if (e.target.classList.contains("fa-play")) {
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    document.querySelector(".song-img").classList.add("play");
    songInfo.classList.add("show-info");
    audio.play();
  } else {
    e.target.classList.remove("fa-pause");
    e.target.classList.add("fa-play");
    document.querySelector(".song-img").classList.remove("play");
    songInfo.classList.remove("show-info");
    audio.pause();
  }
}

//Update Progress

audio.addEventListener("timeupdate", updateProgress);

var progress = document.querySelector(".progress");
function updateProgress(e) {
  // console.log(e.srcElement.duration);
  // console.log(e.srcElement.currentTime);
  var percent = (e.srcElement.currentTime / e.srcElement.duration) * 100;
  progress.style.width = `${percent}%`;
}

//Click Next
var nextClick = document.querySelector(".next-btn");
nextClick.addEventListener("click", nextSong);

function nextSong(e) {
  if (indexSong < 3) {
    indexSong++;
  } else {
    indexSong = 0;
  }
  loadSong(songs[indexSong]);
  // console.log(
  //   e.target.parentElement.previousElementSibling.children[0].classList.contains(
  //     "fa-play"
  //   )
  // );
  var isPlaying =
    e.target.parentElement.previousElementSibling.children[0].classList.contains(
      "fa-play"
    );
  if (!isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
}

//Click Previous
var precClick = document.querySelector(".prev-btn");
precClick.addEventListener("click", prevSong);

function prevSong(e) {
  if (indexSong == 0) {
    indexSong = 3;
  } else {
    indexSong--;
  }
  loadSong(songs[indexSong]);

  var isPlaying =
    e.target.parentElement.nextElementSibling.children[0].classList.contains(
      "fa-play"
    );
  if (!isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
}

//Click Progress Bar
var progressContainer = document.querySelector(".progress-container");
progressContainer.addEventListener("click", updateMusicBar);

function updateMusicBar(e) {
  // console.log(progressContainer.clientWidth);
  // console.log(e.offsetX);

  var duration = audio.duration;
  audio.currentTime = (e.offsetX / progressContainer.clientWidth) * duration;
}

//Auto next when end

audio.addEventListener("ended", autoNextSong);

function autoNextSong() {
  if (indexSong < 3) {
    indexSong++;
  } else {
    indexSong = 0;
  }
  loadSong(songs[indexSong]);
  audio.play();
}

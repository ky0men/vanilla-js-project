const limit = 6;
var page = 1;
function loadPosts() {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      showPosts(data);
    });
}
loadPosts();

//Show Posts
var postsContent = document.querySelector(".posts-content");
function showPosts(data) {
  data.forEach(function (post) {
    var newPost = document.createElement("div");
    newPost.className = "post";
    var ouput = `
    <div class="number">${post.id}</div>
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    `;
    newPost.innerHTML = ouput;
    postsContent.appendChild(newPost);
  });
}

//Adding show posts
document.addEventListener("scroll", addShowPost);
var loadingShow = document.querySelector(".loading");

function addShowPost() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    showLoadingAndPost();
  }
}

//Show loading and fetch new posts

function showLoadingAndPost() {
  loadingShow.classList.add("load");
  setTimeout(function () {
    loadingShow.classList.remove("load");
    loadPosts();
  }, 2000);
}

//Filter Posts
var inputFilter = document.querySelector(".input");

inputFilter.addEventListener("input", filterPost);

function filterPost() {
  var posts = document.querySelectorAll(".post");

  console.log(inputFilter.value);
  console.log(posts);
  posts.forEach(function (post) {
    var postTitle = post.querySelector(".post-title").innerText;
    var postBody = post.querySelector(".post-body").innerText;
    if (
      postTitle.indexOf(inputFilter.value) >= 0 ||
      postBody.indexOf(inputFilter.value) >= 0
    ) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

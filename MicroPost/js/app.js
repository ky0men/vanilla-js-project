var apiUrl = "https://learn-fake-api.herokuapp.com/post";
getPost();
function getPost(e) {
  fetch(apiUrl)
    .then((respone) => respone.json())
    .then((data) => {
      // console.log(data);
      displayPost(data);
    });
}
var postField = document.querySelector(".post-fields");

function displayPost(data) {
  var output = "";
  data.forEach((post) => {
    output += `
      <div class="card border-success mb-3">
        <div class="card-body" id="${post.id}">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <div>
            <span class="edit"><i class="fas fa-pencil-alt"></i></span>
            <span class="delete mx-5"><i class="fas fa-times"></i></span>
          </div>
        </div>
      </div>
    `;
    // postField.appendChild(output);
  });
  postField.innerHTML = output;
}

// Add Post

var postIt = document.querySelector(".submit-post");
postIt.addEventListener("click", addPost);

function addPost() {
  var postTitle = document.querySelector(".post-title").value;
  var postBody = document.querySelector(".post-body").value;
  var addedPost = {
    title: postTitle,
    body: postBody,
  };
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addedPost),
  })
    .then((respone) => respone.json())
    .then((data) => {
      console.log(data);
      var newDiv = document.createElement("div");
      newDiv.className = "card border-success mb-3";
      newDiv.innerHTML = `
      <div class="card-body" id="${data.id}">
        <h4 class="card-title">${data.title}</h4>
        <p class="card-text">${data.body}</p>
        <div>
          <span class="edit"><i class="fas fa-pencil-alt"></i></span>
          <span class="delete mx-5"><i class="fas fa-times"></i></span>
        </div>
      </div>
    `;
      postField.appendChild(newDiv);
      clearFields();
      showAlert("Post Success!");
      setTimeout(hideAlert, 3000);
    });
}

//Clear Fields

function clearFields() {
  document.querySelector(".post-title").value = "";
  document.querySelector(".post-body").value = "";
}

//Delete Post

var deleteClick = document.querySelector(".post-fields");
deleteClick.addEventListener("click", deletePost);

function deletePost(e) {
  console.log(e.target.parentElement.classList.contains("delete"));
  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Are you sure to delete this post!")) {
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
      var id = e.target.parentElement.parentElement.parentElement.id;
      fetch(apiUrl + "\\" + `${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((respone) => respone.json());
      showAlert("Delete Success!");
      setTimeout(hideAlert, 3000);
    }
  }
}

//Edit Post

var editClick = document.querySelector(".post-fields");
editClick.addEventListener("click", editPost);
var submitBtn = document.querySelector(".submit-post");
var updateBtn = document.querySelector(".update-post");
var cancelBtn = document.querySelector(".cancel-post");

//Event click update button

function editPost(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    document.querySelector(".post-title").value =
      e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText;
    document.querySelector(".post-body").value =
      e.target.parentElement.parentElement.previousElementSibling.innerText;
    // console.log(
    //   e.target.parentElement.parentElement.previousElementSibling.innerText
    // );
    var id = e.target.parentElement.parentElement.parentElement.id;
    submitBtn.style.display = "none";
    updateBtn.style.display = "block";
    cancelBtn.style.display = "block";

    //Update Post
    updateBtn.addEventListener("click", updatePost);

    function updatePost() {
      var postTitle = document.querySelector(".post-title").value;
      var postBody = document.querySelector(".post-body").value;
      // console.log(postTitle);
      // console.log(postBody);
      var addedPost = {
        title: postTitle,
        body: postBody,
      };
      fetch(apiUrl + "\\" + `${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedPost),
      })
        .then((respone) => respone.json())
        .then((data) => {
          clearFields();
          e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText =
            data.title;
          e.target.parentElement.parentElement.previousElementSibling.innerText =
            data.body;
          showAlert("Edit Success!");
          setTimeout(hideAlert, 3000);
        });

      submitBtn.style.display = "block";
      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
    }
  }
}
// Cancel update post
cancelBtn.addEventListener("click", cancelPost);
function cancelPost() {
  clearFields();
  submitBtn.style.display = "block";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

//Alert
var alertPost = document.querySelector(".alert-post");

function showAlert(mess) {
  alertPost.style.display = "block";
  alertPost.innerText = mess;
}

// Hidde alert

function hideAlert() {
  alertPost.style.display = "none";
}

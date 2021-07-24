const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

//Show messenger
function showMess(input, mess, type) {
  input.target.parentElement.classList.remove("error");
  input.target.parentElement.classList.remove("success");

  input.target.parentElement.classList.add(type);
  input.target.nextElementSibling.innerText = mess;
}

//Check validate username
userName.addEventListener("blur", checkUserName);

function checkUserName(e) {
  // console.log(e.target);
  if (userName.value == "") {
    showMess(e, "Username is required!", "error");
  } else if (userName.value.length < 3 || userName.value.length > 12) {
    showMess(e, "Username length > 3 and < 10", "error");
  } else {
    showMess(e, "Pass", "success");
  }
}

//Check validate Email

email.addEventListener("blur", checkEmail);

function checkEmail(e) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value == "") {
    showMess(e, "Email is required!", "error");
  } else if (re.test(email.value)) {
    showMess(e, "Pass", "success");
  } else {
    showMess(e, "Email is invalid", "error");
  }
}

//Check validate Password
password.addEventListener("blur", checkPassword);

function checkPassword(e) {
  if (password.value.length < 6) {
    showMess(e, "Password contains at least 6 characters!", "error");
  } else {
    showMess(e, "Pass", "success");
  }
}

//Check vallidate confirm password
confirmPassword.addEventListener("blur", checkConfirmPassword);

function checkConfirmPassword(e) {
  if (password.value !== confirmPassword.value) {
    showMess(e, "Password does not match!", "error");
  } else {
    showMess(e, "Pass", "success");
  }
}

const textInput = document.querySelector(".input-fill");
const addTaskBtn = document.querySelector(".add-task");
// const removeBtn = document.querySelector(".remove-items");
const taskCollection = document.querySelector(".task-collection");
const clearAllTask = document.querySelector(".clear-task");
const inputFilter = document.querySelector("#filter-task");
const taskItems = document.getElementsByClassName("task-item");

//Run function getDatas when page reload
document.addEventListener("DOMContentLoaded", getDatas);

//Add Task
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const newDiv = document.createElement("div");
  newDiv.className = "task-item";

  const newP1 = document.createElement("p");
  newP1.className = "task-name";
  newP1.appendChild(document.createTextNode(textInput.value));

  const newP2 = document.createElement("p");
  newP2.className = "remove-items";
  newP2.innerHTML = '<i class="fas fa-times"></i>';

  newDiv.appendChild(newP1);
  newDiv.appendChild(newP2);

  document.querySelector(".task-collection").appendChild(newDiv);

  saveTask(textInput.value);

  textInput.value = "";

  // console.log(newDiv);
}
//Enter Key Option

textInput.addEventListener("keypress", enterKey);

function enterKey(e) {
  if (e.key == "Enter") {
    addTask();
  }
}

//Remove task
taskCollection.addEventListener("click", removeTask);

function removeTask(e) {
  if (confirm("Are you sure delete this task?")) {
    if (e.target.parentElement.classList.contains("remove-items")) {
      e.target.parentElement.parentElement.remove();
      console.log(e.target.parentElement.parentElement.children[0].innerText);
      //Remove data task
      removeDataTask(
        e.target.parentElement.parentElement.children[0].innerText
      );
    }
  }
}

// Clear All Task

clearAllTask.addEventListener("click", clearAll);

function clearAll() {
  if (confirm("Are you sure delete all task?")) {
    while (taskCollection.firstChild) {
      taskCollection.firstChild.remove();
    }
    removeAllDataTask();
  }
  // console.log("remove all");
}

//Filter Task
inputFilter.addEventListener("keyup", filterTask);

function filterTask() {
  taskItemArr = Array.from(taskItems);
  taskItemArr.forEach(function (a) {
    if (a.children[0].innerText.indexOf(inputFilter.value) != -1) {
      a.style.display = "flex";
      // console.log(a);
    } else {
      a.style.display = "none";
    }
  });
  // console.log(inputFilter.value);
}

//Local storage

function saveTask(task) {
  let dataTasks;
  if (localStorage.getItem("dataTasks") == null) {
    dataTasks = [];
  } else {
    dataTasks = JSON.parse(localStorage.getItem("dataTasks"));
  }

  dataTasks.push(task);
  dataTasks = JSON.stringify(dataTasks);
  localStorage.setItem("dataTasks", dataTasks);
}

//Get data from LS

function getDatas(task) {
  let dataTasks;
  if (localStorage.getItem("dataTasks") == null) {
    dataTasks = [];
  } else {
    dataTasks = JSON.parse(localStorage.getItem("dataTasks"));
  }
  dataTasks.forEach(function (task) {
    const newDiv = document.createElement("div");
    newDiv.className = "task-item";

    const newP1 = document.createElement("p");
    newP1.className = "task-name";
    newP1.appendChild(document.createTextNode(task));

    const newP2 = document.createElement("p");
    newP2.className = "remove-items";
    newP2.innerHTML = '<i class="fas fa-times"></i>';

    newDiv.appendChild(newP1);
    newDiv.appendChild(newP2);

    document.querySelector(".task-collection").appendChild(newDiv);
  });
}

//Remove Data task from LS

function removeDataTask(task) {
  let dataTasks;
  if (localStorage.getItem("dataTasks") == null) {
    dataTasks = [];
  } else {
    dataTasks = JSON.parse(localStorage.getItem("dataTasks"));
  }
  dataTasks.forEach(function (itemOfDataTasks, index) {
    if (task == itemOfDataTasks) {
      dataTasks.splice(index, 1);
      console.log(dataTasks);
    }
    // let index = dataTasks.findIndex(task);
    // dataTasks.splice(index, 1);
    // console.log(index);
  });
  dataTasks = JSON.stringify(dataTasks);
  localStorage.setItem("dataTasks", dataTasks);
}

//remove all data task from LS

function removeAllDataTask() {
  let dataTasks;
  if (localStorage.getItem("dataTasks") == null) {
    dataTasks = [];
  } else {
    dataTasks = JSON.parse(localStorage.getItem("dataTasks"));
  }
  dataTasks = [];
  dataTasks = JSON.stringify(dataTasks);
  localStorage.setItem("dataTasks", dataTasks);
}

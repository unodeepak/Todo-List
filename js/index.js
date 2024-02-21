let todoList = [];
let comdoList = [];
let remList = [];
let addButton = document.getElementById("add-button");
let todoInput = document.getElementById("todo-input");
let date = document.getElementById("date-input");
let desc = document.getElementById("desc");
let deleteAllButton = document.getElementById("delete-all");
let allTodos = document.getElementById("all-todos");
let deleteSButton = document.getElementById("delete-selected");
let textArea = document.getElementById("textArea");

//event listners for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

//event listeners for filtersk
document.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ")[0] == "complete" ||
    e.target.className.split(" ")[0] == "ci"
  ) {
    completeTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "delete" ||
    e.target.className.split(" ")[0] == "di"
  ) {
    deleteTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "editMe" ||
    e.target.className.split(" ")[0] == "dia"
  ) {
    editMe(e);
  }
  if (e.target.id == "all") {
    viewAll();
  }
  if (e.target.id == "rem") {
    viewRemaining();
  }
  if (e.target.id == "com") {
    viewCompleted();
  }
  if (e.target.id == "sort") {
    sortByDate();
  }
});

//event listner for enter key
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});

//updates the all the remaining, completed and main list
function update() {
  comdoList = todoList.filter((ele) => {
    return ele.complete;
  });
  remList = todoList.filter((ele) => {
    return !ele.complete;
  });
  document.getElementById("r-count").innerText = todoList.length.toString();
  document.getElementById("c-count").innerText = comdoList.length.toString();
}

//adds the task in main list

function add() {
  var value = todoInput.value;
  let dateVal = date.value;
  let descVal = desc.value;

  if (value === "") {
    alert("😮 Task cannot be empty");
    return;
  } else if (dateVal == "") {
    alert("Date cannot be empty");
    return;
  }

  todoList.push({
    id: Date.now().toString(),
    task: value,
    complete: false,
    dateVal,
    descVal,
  });

  todoInput.value = "";
  date.value = "";
  desc.value = "";
  desc.textContent = "";

  update();
  addinmain(todoList);
}

//renders the main list and views on the main content
function addinmain(todoList) {
  allTodos.innerHTML = "";
  todoList.forEach((element) => {
    var x = `<li id=${element.id} class="todo-item1">
                <div class="todo-item">
                  <div class="titleValue">
                      <p id="task" class="${element.id}_task">  ${
      element.complete ? `<strike>${element.task}</strike>` : element.task
    } </p>
                  </div>
                  <div class="${element.id}_dateValue dateValue" >
                      ${element.dateVal}
                  </div>
                  <div class="todo-actions">
                      <button class="complete btn btn-success btn-circle">
                          <i class="ci bx bx-check bx-sm"></i>
                      </button>

                      <button class="editMe btn btn-edit btn-circle" id="${
                        element.id
                      }">
                          <i class="dia bx bx-edit bx-sm"></i>
                      </button>

                      <button class="delete btn btn-error btn-circle">
                          <i class="di bx bx-trash bx-sm"></i>
                      </button>
                  </div>
                </div>
                <p class="textArea ${element.id}_textArea">${
      element.descVal
    }</p>
            </li>
        `;

    allTodos.innerHTML += x;
  });
}

/* This function used to update the todo list */
function editMe(e) {
  var id = e.target.parentElement.id;
  const paragraph = document.getElementsByClassName(`${id}_task`)[0];
  const dateValue = document.getElementsByClassName(`${id}_dateValue`)[0];
  const textArea = document.getElementsByClassName(`${id}_textArea`)[0];

  const title = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const textarea = document.getElementById("desc");

  if (title?.value || dateValue?.value || textArea?.value) {
    alert("Please add then update");
    return false;
  }

  title.value = paragraph?.innerText;

  if (dateValue?.innerText?.trim()?.length > 0) {
    dateInput.value = dateValue?.innerText?.trim();
  }

  textarea.textContent = textArea.innerText;
  textarea.value = textArea.innerText;

  /* Update the List */
  todoList = todoList.filter((ele) => {
    return ele.id != id;
  });

  update();
  addinmain(todoList);
}

//deletes and indiviual task and update all the list
function deleteTodo(e) {
  var deleted =
    e.target.parentElement.parentElement.parentElement.getAttribute("id");
  console.log({ deleted });
  todoList = todoList.filter((ele) => {
    return ele.id != deleted;
  });

  update();
  addinmain(todoList);
}

//completes indiviaula task and updates all the list
function completeTodo(e) {
  console.log("Parent Element: ", e);
  var completed =
    e.target.parentElement.parentElement.parentElement.getAttribute("id");
  todoList.forEach((obj) => {
    if (obj.id == completed) {
      if (obj.complete == false) {
        obj.complete = true;
        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.add("line");
      } else {
        obj.complete = false;

        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.remove("line");
      }
    }
  });

  update();
  addinmain(todoList);
}

//deletes all the tasks
function deleteAll(todo) {
  todoList = [];

  update();
  addinmain(todoList);
}

//deletes only completed task
function deleteS(todo) {
  todoList = todoList.filter((ele) => {
    return !ele.complete;
  });

  update();
  addinmain(todoList);
}

// functions for filters
function viewCompleted() {
  addinmain(comdoList);
}

function viewRemaining() {
  addinmain(remList);
}
function viewAll() {
  addinmain(todoList);
}
function sortByDate() {
  let todoListByDate = todoList.sort((a, b) => {
    const dateA = new Date(a.dateVal);
    const dateB = new Date(b.dateVal);

    return dateA - dateB;
  });
  console.log({ todoListByDate, todoList });
  addinmain(todoListByDate);
}

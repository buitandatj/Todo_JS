var taskName = document.getElementById("content");
const getFromLocal = () => {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
};

const saveTask = (newtasks) => {
  localStorage.setItem("tasks", JSON.stringify(newtasks));
  renderTask(newtasks);
};

function submitTask() {
  if (!taskName.value) {
    alert("Vui lòng nhập...");
    return false;
  }
  let tasks = getFromLocal();
  const size = tasks.length;
  tasks.push({
    name: taskName.value,
    id: Math.floor(Math.random() * 99999),
    completed: false,
  });

  taskName.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask(tasks);
}
function completeTask(id) {
  tasks = getFromLocal();

  const newTasks = tasks.map((t) => {
    if (t.id === id) {
      t.completed = !t.completed;
    }
    return t;
  });

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  renderTask(newTasks);
}
function clearComplete() {
  let tasks = getFromLocal();
  const newTasks = tasks.filter((e) => {
    return e.completed == false;
  });
  saveTask(newTasks);
}

function deleteTask(id) {
  let tasks = getFromLocal();
  const newTasks = tasks.filter((task) => {
    console.log(id, task.id !== id);
    return task?.id !== id;
  });
  saveTask(newTasks);
}
function renderTask(tasks = [], filter) {
  let content = "<ul>";
  if (tasks == null) {
    tasks = getFromLocal();
  }
  const hasComplete = tasks.find((x) => x.completed);
  if (!hasComplete) {
    document.getElementById("clear").style.visibility = "hidden";
  } else {
    document.getElementById("clear").style.visibility = "visible";
  }

  tasks.forEach((task) => {
    if (filter == "COMPLETED" && !task.completed) {
      return;
    } else if (filter == "ACTIVE" && task.completed) {
      return;
    }
    content += `<li class="task-item"  >
                    <div id="${
                      task?.id
                    }" contenteditable="true" onblur="editTask(${
      task?.id
    })" class='${task.completed ? "line-through" : ""} task-name'>${
      task.name
    }</div>
                    <div>
                        <input ${
                          task.completed ? "checked" : ""
                        } onclick="completeTask(${
      task.id
    })" type='checkbox' id="checkbox"> 
                        <span onclick="deleteTask(${task.id})">Xóa</span>
                    </div>
                </li>`;
  });

  content += "</ul>";
  const ele = document.getElementById("result");
  if (ele) ele.innerHTML = content;
}
renderTask(getFromLocal());

function editTask(id) {
  let tasks = getFromLocal();
  const newTasks = tasks.map(function (e) {
    if (e.id == id) {
      var edit = document.getElementById(id + "").innerText;
      return { ...e, name: edit };
    }
    return e;
  });
  saveTask(newTasks);
}
function CheckAll() {
  let tasks = getFromLocal();
  let allComplete = false;
  let countComplete = 0;
  for (const t of tasks) {
    if (t.completed) {
      countComplete += 1;
    }
  }
  allComplete = countComplete === tasks.length ? false : true;
  const newTasks = tasks.map(function (e) {
    e.completed = allComplete;
    return e;
  });
  saveTask(newTasks);
}

// const todoList = []

// todo = ''

// todo = {
//     task: 'abc',
//     isChecked: true
// }

// isChecked = !isChecked

let num = 10;
num = "";

const sum = (a, b) => {
  return a + b;
};

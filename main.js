var taskName = document.getElementById("content");
const getFromLocal = () => {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
};

renderTask(getFromLocal());
function submitTask() {
  if (!taskName.value) {
    alert("Vui lòng nhập");
    return false;
  }
  let tasks = getFromLocal();
  const size = tasks.length;
  tasks.push({
    name: taskName.value,
    id: Math.floor(Math.random() * 99999),
    order: size + 1,
    completed: false,
  });

  taskName.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask(tasks);
}
function completeTask(id) {
  tasks = getFromLocal();

  const newTasks = tasks?.map((t) => {
    if (t.id === id) {
      t.completed = !t.completed;
    }
    return t;
  });

  localStorage.setItem("tasks", JSON.stringify(newTasks));
  renderTask(newTasks);
}

function deleteTask(id) {
  let tasks = getFromLocal();
  const newTasks = tasks?.filter((task) => {
    console.log(id, task?.id !== id);
    return task?.id !== id;
  });
  console.log(newTasks);
  saveTask(newTasks);
}
const saveTask = (newtasks) => {
  localStorage.setItem("tasks", JSON.stringify(newtasks));
  renderTask(newtasks);
};
function clearComplete() {
  let tasks = getFromLocal();
  const newTasks = tasks.filter((e) => {
    return e.completed == false;
  });
  saveTask(newTasks);
}

function renderTask(tasks = [], filter) {
  let content = "<ul>";
  if (tasks == null) {
    tasks = getFromLocal();
  }
  tasks.forEach((task) => {
    if (filter == "COMPLETED" && !task?.completed) {
      return;
    } else if (filter == "ACTIVE" && task?.completed) {
      return;
    }
    content += `<li class="task-item">
                    <div id="${task?.id}"  class='${
      task.completed ? "line-through" : ""
    } task-name'>${task.name}</div>
                    <div>
                        <input ${
                          task.completed ? "checked" : ""
                        } onclick="completeTask(${task.id})" type='checkbox'> 
                        <a href="#" onclick="deleteTask(${task.id})">Xóa</a>
                    </div>
                </li>`;
  });

  content += "</ul>";

  document.getElementById("result").innerHTML = content;
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
  allComplete = countComplete === tasks?.length ? false : true;
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

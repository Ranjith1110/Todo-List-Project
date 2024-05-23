

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const allTaskList = document.querySelectorAll("ul li");
const clearBtn = document.querySelector(".clear-task");

loadEventListener();


function loadEventListener() {

    document.addEventListener("DOMContentLoaded", getTasks);

    form.addEventListener("submit", addTask);

    taskList.addEventListener("click", removeTask);

    clearBtn.addEventListener("click", clearTasks);

}

function getTasks() {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");

        li.className = "collection-item";

        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a");

        link.className = "delete-item secondary-content";

        link.innerHTML = `<i class="fa fa-remove"></i>`;

        li.appendChild(link);

        taskList.appendChild(li);
    })
}

function addTask(event) {

    event.preventDefault();

    if (taskInput.value === "") {
        alert("Please fill the form");
        return;
    }

    const existingtasks = document.querySelectorAll(".collection-item");

    for (let task of existingtasks) {
        if (task.innerText.trim() === taskInput.value.trim()) {
            alert("Already exist");
            return;
        }
    }


    const li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = `<i class="fa fa-remove"></i>`;

    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
}

function storeTaskInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



function removeTask(eve) {
    if (eve.target.parentElement.classList[0] === "delete-item") {
        eve.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(eve.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskElement) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskElement.innerText === task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {

    // const changeToArray = Array.from(taskList.children);
    // changeToArray.forEach(function (re) {
    //     re.remove();
    // })

    // allTaskList.forEach(function(re){
    //     re.remove();
    // })

    taskList.innerHTML = null;

    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
    // localStorage.removeItem("tasks");
}


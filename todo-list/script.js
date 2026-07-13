const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addBtn.addEventListener("click", addTask);

// Add Task using Enter key
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add Task Function
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(text);

    taskInput.value = "";
    saveTasks();
    updateCount();
}

// Create Task
function createTask(text, completed = false) {

    const li = document.createElement("li");

    // Task Text
    const span = document.createElement("span");
    span.className = "task-text";
    span.innerText = text;

    if (completed) {
        span.classList.add("completed");
    }

    // Toggle Complete
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    // Buttons
    const actions = document.createElement("div");
    actions.className = "actions";

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", () => {
        const updated = prompt("Edit Task", span.innerText);

        if (updated !== null && updated.trim() !== "") {
            span.innerText = updated.trim();
            saveTasks();
        }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
        updateCount();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);

    updateCount();
}

// Save Tasks
function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach((li) => {

        const span = li.querySelector(".task-text");

        tasks.push({
            text: span.innerText,
            completed: span.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });

    updateCount();
}

// Update Counter
function updateCount() {

    const total = document.querySelectorAll("#taskList li").length;

    taskCount.innerText =
        total === 1 ? "1 Task" : `${total} Tasks`;
}
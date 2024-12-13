document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-btn');

    // Load tasks from JSON file
    async function loadTasks() {
        const response = await fetch('tasks.json');
        const tasks = await response.json();
        tasks.forEach(task => addTaskToList(task));
    }

    // Add a task to the list (UI)
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.task}</span>
            <button onclick="removeTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Add task via input
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const newTask = {
                id: Date.now(),
                task: taskText,
                completed: false
            };
            addTaskToList(newTask);
            newTaskInput.value = ''; // Clear input
        }
    });

    // Remove task (UI)
    window.removeTask = (taskId) => {
        const taskItem = document.querySelector(`.task-item[data-id='${taskId}']`);
        if (taskItem) taskList.removeChild(taskItem);
    };

    // Initialize
    loadTasks();
});

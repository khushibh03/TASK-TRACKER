document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = [];
    let editTaskId = null;

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            if (editTaskId) {
                updateTask(editTaskId, taskText);
            } else {
                addTask(taskText);
            }
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');

            const taskTextDiv = document.createElement('div');
            taskTextDiv.className = 'task-text';
            taskTextDiv.textContent = task.text;

            const taskButtonsDiv = document.createElement('div');
            taskButtonsDiv.className = 'task-buttons';

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.classList.add('update-btn');
            updateBtn.addEventListener('click', () => prepareUpdateTask(task.id, task.text));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn'); // Ensure the button has the correct class
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskButtonsDiv.appendChild(updateBtn);
            taskButtonsDiv.appendChild(deleteBtn);
            li.appendChild(taskTextDiv);
            li.appendChild(taskButtonsDiv);
            taskList.appendChild(li);
        });
    }

    function prepareUpdateTask(taskId, taskText) {
        taskInput.value = taskText;
        editTaskId = taskId;
    }

    function updateTask(taskId, taskText) {
        tasks = tasks.map(task => task.id === taskId ? { ...task, text: taskText } : task);
        editTaskId = null;
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }
});

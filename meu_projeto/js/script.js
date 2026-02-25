// JavaScript code for the To-Do List application

// Array to store tasks with completion status
let tasks = [];

// Function to render the task list in the DOM
function render() {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            render();
        });

        // Create task text
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('task-delete');
        deleteBtn.textContent = 'Deletar';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            render();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

// Function to validate user input
function validarTarefa(texto) {
    return texto.trim() !== '';
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const errorMessage = document.querySelector('#error-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const taskText = taskInput.value;

        if (validarTarefa(taskText)) {
            tasks.push({ text: taskText, completed: false }); // Add task to the array
            render(); // Update the task list
            taskInput.value = ''; // Clear the input field
            errorMessage.textContent = ''; // Clear any previous error messages
        } else {
            errorMessage.textContent = 'Please enter a valid task.'; // Display error message
        }
    });
});
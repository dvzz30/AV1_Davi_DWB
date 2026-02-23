// JavaScript code for the To-Do List application

// Array to store tasks
let tasks = [];

// Function to render the task list in the DOM
function render() {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
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
            tasks.push(taskText); // Add task to the array
            render(); // Update the task list
            taskInput.value = ''; // Clear the input field
            errorMessage.textContent = ''; // Clear any previous error messages
        } else {
            errorMessage.textContent = 'Please enter a valid task.'; // Display error message
        }
    });
});
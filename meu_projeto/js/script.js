// JavaScript code for the To-Do List application

// Array to store tasks with IDs
let tasks = [];
let taskIdCounter = 1;
let editingTaskId = null;

// Function to render the task list in the DOM
function render() {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.setAttribute('data-id', task.id);
        
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        
        const taskButtons = document.createElement('div');
        taskButtons.classList.add('task-buttons');
        
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Editar';
        editBtn.addEventListener('click', () => openEditModal(task.id, task.text));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskButtons.appendChild(editBtn);
        taskButtons.appendChild(deleteBtn);
        
        listItem.appendChild(taskText);
        listItem.appendChild(taskButtons);
        taskList.appendChild(listItem);
    });
}

// Function to validate user input
function validarTarefa(texto) {
    return texto.trim() !== '';
}

// Function to open the edit modal
function openEditModal(taskId, taskText) {
    editingTaskId = taskId;
    const modal = document.querySelector('#edit-modal');
    const editInput = document.querySelector('#edit-input');
    editInput.value = taskText;
    modal.style.display = 'block';
    editInput.focus();
}

// Function to close the edit modal
function closeEditModal() {
    const modal = document.querySelector('#edit-modal');
    modal.style.display = 'none';
    editingTaskId = null;
}

// Function to edit a task
function editTask() {
    const editInput = document.querySelector('#edit-input');
    const newText = editInput.value;
    
    if (validarTarefa(newText)) {
        const task = tasks.find(t => t.id === editingTaskId);
        if (task) {
            task.text = newText;
            render();
            closeEditModal();
        }
    } else {
        alert('Por favor, digite uma tarefa válida.');
    }
}

// Function to delete a task
function deleteTask(taskId) {
    if (confirm('Você tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        render();
    }
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const errorMessage = document.querySelector('#error-message');
    const modal = document.querySelector('#edit-modal');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.querySelector('#save-btn');
    const cancelBtn = document.querySelector('#cancel-btn');
    const editInput = document.querySelector('#edit-input');

    // Add task
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value;

        if (validarTarefa(taskText)) {
            tasks.push({ id: taskIdCounter++, text: taskText });
            render();
            taskInput.value = '';
            errorMessage.textContent = '';
        } else {
            errorMessage.textContent = 'Por favor, digite uma tarefa válida.';
        }
    });

    // Modal close button
    closeBtn.addEventListener('click', closeEditModal);

    // Modal cancel button
    cancelBtn.addEventListener('click', closeEditModal);

    // Modal save button
    saveBtn.addEventListener('click', editTask);

    // Save on Enter key
    editInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            editTask();
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeEditModal();
        }
    });
});
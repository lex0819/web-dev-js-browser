'use strict';

const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');
const taskList = document.querySelector('.task-list');
const clearBtn = document.querySelector('.clear');

// Восстановление списка дел из локального хранилища при загрузке страницы
if (localStorage.getItem('tasks')) {
    taskList.innerHTML = localStorage.getItem('tasks');
}

clearBtn.addEventListener('click', () => {
    localStorage.clear();
});

addButton.addEventListener('click', () => {
    const taskDescription = taskInput.value;
    if (taskDescription !== '') {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.innerHTML = `
            <span class="task-description">${taskDescription}</span>
            <button class="clone-button">Клонировать</button>
            <button class="delete-button">Удалить</button>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';

        // Сохранение списка дел в локальное хранилище
        localStorage.setItem('tasks', taskList.innerHTML);
    }
});

taskList.addEventListener('click', (event) => {
    //Delete todo
    if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.closest('li');
        listItem.parentNode.removeChild(listItem);

        localStorage.setItem('tasks', taskList.innerHTML); // Обновление списка дел в локальном хранилище
    }

    //clone todo
    if (event.target.classList.contains('clone-button')) {
        const listItem = event.target.closest('li');
        const cloneListItem = listItem.cloneNode(true); //clone
        listItem.after(cloneListItem); //add after

        localStorage.setItem('tasks', taskList.innerHTML); // Обновление списка дел в локальном хранилище
    }
});

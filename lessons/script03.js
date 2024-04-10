'use strict';

//Task 01
const selectForm = document.forms.superForm.selectForm;
// Следующие три строки делают одно и то же
selectForm.options[2].selected = true;
selectForm.selectedIndex = 2;
selectForm.value = 'SkillFactory';
const selected = Array.from(selectForm.options)
    .filter((option) => option.selected)
    .map((option) => option.value);
console.log(selected);

// Task 02
// Вы разрабатываете веб-приложение для выбора и отображения данных о странах. У вас есть форма, включающая элемент select, в котором пользователь может выбрать определенную страну. При выборе страны, вам необходимо динамически обновлять другой элемент на странице, например, отображать информацию о столице выбранной страны.

const selectElement = document.querySelector('#country-select');
const capitalInfoElement = document.querySelector('#capital-info');

selectElement.onchange = function () {
    const selectedCountry = selectElement.value;
    console.log(selectedCountry);
    let capital = '';
    // Определяем столицу в зависимости от выбранной страны
    switch (selectedCountry) {
        case 'russia':
            capital = 'Москва';
            break;
        case 'usa':
            capital = 'Вашингтон, D.C. ';
            break;
        case 'china':
            capital = 'Пекин';
            break;
        default:
            capital = 'Выберите страну, чтобы узнать столицу. ';
            break;
    }
    // Обновляем информацию о столице на странице
    capitalInfoElement.textContent = capital;
};

//Task 03
// Список товаров. Сортировка. По возрастанию цены. По убыванию цены.

const sortSelect = document.querySelector('#sort-select'); // Получение ссылки на элемент select no ero id
const productList = document.querySelector('#product-list'); // Получение ссылки на список товаров по его id
const productItems = Array.from(document.querySelectorAll('.product-item')); // Получение ссылок на все элементы списка товаров

// sortSelect.addEventListener('change', ()=>{})
sortSelect.onchange = function () {
    // Назначение обработчика события onchange для элемента select
    const selectedOption = sortSelect.value; // Получение выбранной опции сортировки
    // Сортировка списка товаров по цене
    if (selectedOption === 'asc') {
        productItems.sort((a, b) => {
            const priceA = parseInt(a.textContent.split('- $')[1]); // Извлечение цены из текстового содержимого элемента
            const priceB = parseInt(b.textContent.split('- $')[1]); // Извлечение цены из текстового содержимого элемента
            return priceA - priceB;
        });
    } else if (selectedOption === 'desc') {
        productItems.sort((a, b) => {
            const priceA = parseInt(a.textContent.split('- $')[1]); // Извлечение цены из текстового содержимого элемента
            const priceB = parseInt(b.textContent.split('- $')[1]); // Извлечение цены из текстового содержимого элемента
            return priceB - priceA;
        });
    }
    // Обновление порядка элементов в DOM
    productItems.forEach((item) => productList.appendChild(item));
};

//Task 04
// Check email

const input = document.forms.superForm01.input;
const error = document.querySelector('#error');

input.onblur = function () {
    if (!input.value.includes('@')) {
        // He email
        input.classList.add('invalid');
        error.innerHTML = 'Пожалуйста, введите правильный email.';
    }
};

input.onfocus = function () {
    if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');
        error.innerHTML = '';
    }
};

//Task 05
//Form Input, Change, Copy, Cut, Paste
// cpy-paste and cut mint be create only in input or textarea
const form05 = document.forms.superForm05;
form05.email.onchange = () => {
    console.log('change - email: ', form05.email.value);
};
form05.email.oninput = () => {
    console.log('input - email: ', form05.email.value);
};

form05.selectForm.onchange = () => {
    console.log('change - selectForm: ', form05.selectForm.value);
};
form05.selectForm.oninput = () => {
    console.log('input - selectForm: ', form05.selectForm.value);
};
form05.checkbox.onchange = () => {
    console.log('change - checkbox: ', form05.checkbox.checked);
};

form05.checkbox.oninput = () => {
    console.log('input - checkbox: ', form05.checkbox.checked);
};

form05.email.oncut =
    form05.email.oncopy =
    form05.email.onpaste =
        (event) => {
            console.log(
                event.type + ' - ' + event.clipboardData.getData('text/plain')
            );
        };

//Task 06
// How many chars in the textarea has entered user?
const commentInput = document.querySelector('#comment-input');
const charCountElement = document.querySelector('#char-count');
commentInput.addEventListener('input', updateCharCount);
commentInput.addEventListener('cut', updateCharCount);
commentInput.addEventListener('copy', updateCharCount);
function updateCharCount() {
    setTimeout(() => {
        const comment = commentInput.value;
        const charCount = comment.length;
        charCountElement.textContent = charCount;
    }, 0);
}

//Task 07
// Form submit
const form07 = document.forms.superForm07;
form07.checkbox.oninput = () => {
    form07.submit();
};

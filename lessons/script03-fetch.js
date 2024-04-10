'use strict';

//Task get from server
(async () => {
    const url = 'https://catfact.ninja/fact';
    const response = await fetch(url);
    console.log('catfact.ninja anwered', response.status);
    console.log('catfact.ninja anwered OK', response.ok);
    const fact = await response.json();
    console.log('catfact json data', fact);
})();
// response. json ( - JSON,
// response.text) -текст,
// response. blob() -Blob (бинарные данные с типом),
// response.arrayBuffer() -ArrayBuffer (низкоуровневое представление бинарных данных) ,
// response. formData() - объект FormData,
// response.body - объект ReadableStream, с помощью которого можно считывать тело запроса по частям.

//Output all data from server as object with many facts
fetch('https://catfact.ninja/facts')
    .then((response) => response.json())
    .then((data) => console.log(data));

// Или для вывода только факта:
fetch('https://catfact.ninja/fact')
    .then((response) => response.json())
    .then((obj) => console.log(obj.fact));

//Task send to server
fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    body: JSON.stringify({
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
    }),
})
    .then((res) => res.json())
    .then((json) => console.log('POST fakestoreapi.com', json));

//Task 08
//Send form to server

const form08 = document.forms.superForm08;
form08.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: new FormData(form08),
    });
    let result = await response.json();
    console.log('task 08', result);
};

(async () => {
    //Шаг 1: начинаем загрузку fetch, получаем поток для чтения
    let response = await fetch(
        'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100'
    );
    const reader = response.body.getReader();

    // Шаг 2: считываем данные:
    let receivedLength = 0; // количество байт, полученных на данный момент
    let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        console.log(`Получено ${receivedLength} байт`);
    }

    // Шаг 3: соединим фрагменты в общий типизированный массив Uint8Array
    let chunksAll = new Uint8Array(receivedLength);
    let position = 0;

    for (let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
    }

    // Шаг 4: декодируем Uint8Array обратно в строку
    let result = new TextDecoder('utf-8').decode(chunksAll);

    // Готово!
    let commits = JSON.parse(result);
    console.log(commits);
})();

//Task 09 random user
//https://randomuser.me/api

// Получаем ссылки на элементы страницы
const userListElement = document.querySelector('#user-list');
const sortSelectRandom = document.querySelector('#sort-select09');

// Загружаем данные о случайных пользователях с помощью АРІ
fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json()) // Преобразуем ответ в формат JSON
    .then((data) => {
        console.log(data);
        let users = data.results; // Получаем массив с данными о пользователях

        // Первоначальный вывод списка пользователей
        renderUserList(users);

        // Обработчик события изменения выбора в селекте
        sortSelectRandom.addEventListener('change', () => {
            const selectedOption = sortSelectRandom.value; // Получаем выбранный параметр сортировки
            users = sortUsers(users, selectedOption); // Сортируем пользователей в соответствии с выбранным параметром
            renderUserList(users); // Выводим отсортированный список пользователей на страницу
        });
    })
    .catch((error) => console.log(error));

// Функция для вывода списка пользователей на страницу
function renderUserList(users) {
    // Очищаем список пользователей перед выводом
    userListElement.innerHTML = '';

    // Создаем элементы HTML для каждого пользователя и добавляем их в список
    users.forEach((user) => {
        const userElement = createUserElement(user);
        userListElement.appendChild(userElement);
    });
}

// Функция для создания элемента пользователя
function createUserElement(user) {
    const userContainer = document.createElement('div');
    userContainer.classList.add('user');

    const userName = document.createElement('p');
    userName.textContent = `Name: ${user.name.first} ${user.name.last}`;
    userContainer.appendChild(userName);

    const userAge = document.createElement('p');
    userAge.textContent = `Age: ${user.dob.age}`;
    userContainer.appendChild(userAge);

    return userContainer;
}

// Функция для сортировки пользователей
function sortUsers(users, sortBy) {
    return users.sort((a, b) => {
        if (sortBy == 'name') {
            return a.name.first.localeCompare(b.name.first);
        } // Сортировка по имени с использованием метода localeCompare ()
        else if (sortBy === 'age ASC') {
            return a.dob.age - b.dob.age;
        } else if (sortBy === 'age DESC') {
            return b.dob.age - a.dob.age;
        }
    });
}

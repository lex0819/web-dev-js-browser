'use strict';

// Задание 1 (тайминг 35 минут)
// Вы разрабатываете интернет-магазин и хотите добавить функциональность динамического фильтрации товаров по категориям. У вас есть форма с выпадающим списком (select), в котором пользователь может выбрать категорию товаров. При выборе категории товаров, необходимо динамически обновлять список отображаемых товаров на странице, чтобы пользователь видел только товары из выбранной категории.
// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Выпадающий список (select) с категориями товаров.
// b. Список товаров, который будет отображать товары в
// соответствии с выбранной категорией.
// c. Каждый товар в списке должен содержать название и категорию.
// 2. Используйте HTML для создания элементов интерфейса.
// 3. Используйте JavaScript для обработки событий:
// ○ При выборе категории товаров в выпадающем списке, форма должна следить за изменениями.
// ○ Динамически обновите список товаров на странице, чтобы отображать только товары из выбранной категории.
// 4. Создайте объекты товаров и их категорий для имитации данных магазина.
// 5. Стилизуйте элементы интерфейса с помощью CSS для улучшения внешнего вида.
// 6. Make Cart and add to it in LocalStorage

const productsData = [
    { id: 1, name: 'Laptop', category: 'Electronic' },
    { id: 2, name: 'Smartphone', category: 'Electronic' },
    { id: 3, name: 'Coffee machine', category: 'Bit Tech' },
    { id: 4, name: 'Camera', category: 'Electronic' },
    { id: 5, name: 'Micro wave', category: 'Bit Tech' },
    { id: 6, name: 'book', category: 'Books' },
    { id: 7, name: 'T-short', category: 'Clothes' },
    { id: 8, name: 'Heat', category: 'Clothes' },
    { id: 9, name: 'Chair', category: 'Furniture' },
];

let cart = localStorage.getItem('cartProd')
    ? JSON.parse(localStorage.getItem('cartProd'))
    : [];

const choiceProduct = document.getElementById('task01'); // Получение ссылки на элемент select no ero id
const productList = document.querySelector('.products'); // Получение ссылки на список товаров по его id

const productArray = createProductsHtml(productsData);
productList.innerHTML = productArray.join('');

function createProductsHtml(products) {
    return products.map((product) => {
        let data = `
        <div data-id=${product.id} class="product-item">
            Product <strong>${product.name}</strong>
             in Category <i>${product.category}</i>
        `;
        if (cart.includes(product.id)) {
            data += `
            <button type="button" class="buy-btn" disabled>Buy</button>
            </div>
            `;
        } else {
            data += `
            <button type="button" class="buy-btn">Buy</button>
            </div>
            `;
        }
        return data;
    });
}

function getProductByCategory(category) {
    if (category === '') {
        return productsData;
    } else {
        return productsData.filter((prod) => prod.category === category);
    }
}

choiceProduct.addEventListener('change', () => {
    productList.innerHTML = createProductsHtml(
        getProductByCategory(choiceProduct.value)
    ).join('');
});

productList.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('buy-btn')) {
        return;
    }
    const currentProduct = +target
        .closest('.product-item')
        ?.getAttribute('data-id');
    cart.push(currentProduct);
    localStorage.setItem('cartProd', JSON.stringify(cart));
    target.disabled = true;
});

// Задание 3 (тайминг 30 минут)
// 1. Создайте HTML-файл с простой веб-страницей, содержащей заголовок "Список пользователей" и пустой список для отображения пользователей.
// 2. Напишите JavaScript-код для выполнения следующих шагов:
// a. Создайте функцию fetchUserList(), которая будет выполнять GET-запрос к "https://jsonplaceholder.typicode.com/users" для получения списка пользователей. В случае ошибки запроса, функция должна обработать ошибку и вернуть пустой массив.
// b. Создайте обработчик события "load" на объекте window, чтобы выполнить запрос к API при загрузке страницы.
// c. Внутри обработчика события "load", вызовите функцию fetchUserList() для получения списка пользователей.
// d. Создайте элементы списка (например, элементы <li>) для каждого пользователя в полученном списке.
// e. Добавьте созданные элементы в список пользователей на веб-странице.

const userList = document.getElementById('user-list');

async function fetchUserList() {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );
        if (!response.ok) {
            throw new Error('Server is not reachable');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (err) {
        throw err;
        return [];
    }
}

const addUsersToHtml = (users) => {
    for (const user of users) {
        userList.insertAdjacentHTML(
            'beforeend',
            `<li> Name: ${user?.name}, Phone: ${user?.phone}</li>`
        );
    }
};

window.addEventListener('load', async () => {
    try {
        const users = await fetchUserList();
        addUsersToHtml(users);
    } catch (err) {
        const errorMessage = document.createElement('li');
        errorMessage.textContent = `Error during uploading users: ${err.message}`;
        userList.append(errorMessage);
    }
});

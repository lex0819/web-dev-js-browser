'use strict';

// Задание 1 (тайминг 30 минут)
// Работа с BOM
// 1. Определение текущего размера окна браузера:
// ○ Напишите функцию, которая будет выводить текущую ширину и высоту окна браузера при его изменении.
// 2. Подтверждение закрытия страницы:
// ○ Создайте всплывающее окно или диалоговое окно, которое появляется при попытке закрыть вкладку браузера и спрашивает пользователя, уверен ли он в своем решении закрыть страницу.
// 3. Управление историей переходов:
// ○ Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и "Вперед" для перемещения по истории.
const width = document.getElementById('width').querySelector('span');
const height = document.getElementById('height').querySelector('span');

width.textContent = window.innerWidth;
height.textContent = window.innerHeight;

function showResizeWindow() {
    console.log("window's width", window.innerWidth);
    console.log("window's height", window.innerHeight);
}

window.addEventListener('resize', () => {
    // showResizeWindow();
    width.textContent = window.innerWidth;
    height.textContent = window.innerHeight;
});

window.addEventListener('onbeforeunload', (e) => {
    e.preventDefault();
    alert('You a leaving the page!');
    confirm('Are you sure leave the page?');
});

const backBtn = document.querySelector('.back-btn');
const forwardBtn = document.querySelector('.forward-btn');

backBtn.addEventListener('click', () => {
    window.history.back();
});

forwardBtn.addEventListener('click', () => {
    window.history.forward();
});

// Задание 2 (тайминг 30 минут)
// Вы должны создать веб-страницу, которая позволяет пользователю динамически управлять элементами на странице. Ниже приведены основные требования и функциональность:
// 1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и "Клонировать элемент".
// 2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент должен иметь класс .box и содержать текст, указывающий порядковый номер элемента (1, 2, 3 и так далее).
// 3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный элемент, если таковой имеется.
// 4. При нажатии на кнопку "Клонировать элемент" создается копия последнего добавленного элемента и добавляется на страницу.
// 5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
// 6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в
// любом количестве.

const task02 = document.getElementById('02');
const container = task02.querySelector('.container');

task02.addEventListener('click', (ev) => {
    const btn = ev.target;
    if (btn.closest('.add')) {
        const listItem = document.createElement('div');
        listItem.classList.add('box');
        listItem.textContent = container.children.length + 1;
        container.appendChild(listItem);
    } else if (btn.closest('.remote')) {
        container.lastElementChild?.remove();
    } else if (btn.closest('.clone')) {
        if (container.children.length > 0) {
            const listItem = container.lastElementChild.cloneNode(true);
            container.appendChild(listItem);
        }
    }
});

// Задание 3 (тайминг 50 минут)
// 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и текста. Вам необходимо использовать Bootstrap для стилизации элементов.
// 2. Используйте Bootstrap, чтобы стилизовать элементы:
// a. Заголовок статьи (<h2>)
// b. Текст статьи (<p>)
// c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
// 3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте JSON-данные для определения заголовков и текстов статей.
// 4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
// 5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая статья должна быть удалена из списка.
// 6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать" пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте всплывающее окно или prompt для ввода новых данных.
// 7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное хранилище браузера, чтобы они сохранялись после перезагрузки страницы.

const articlesData = [
    {
        id: Date.now() - 1,
        title: 'Заголовок статьи 1',
        content: 'Содержание статьи 111',
    },
    {
        id: Date.now(),
        title: 'Заголовок статьи 2',
        content: 'Содержание статьи 222',
    },
    {
        id: Date.now() + 1,
        title: 'Заголовок статьи 3',
        content: 'Содержание статьи 333',
    },
];

const initialJson = JSON.stringify(articlesData);

const lsKey = 'articles';
if (!localStorage.getItem(lsKey)) {
    localStorage.setItem(lsKey, initialJson);
}

const articles = JSON.parse(localStorage.getItem(lsKey));

const news = document.querySelector('.news');
const addNewArticle = document.querySelector('.add-news');

function createArticleHTML(article) {
    return `
        <div class="row" data-id="${article.id}">
            <div class="col p-2">
                <h2 class="title">${article.title}</h2>
                <p class="content">${article.content}</p>
            </div>
            <div class="col p-2">
                <button class="edit btn btn-primary">Редактировать</button>
            </div>
            <div class="col p-2">
                <button class="del btn btn-danger">Удалить</button>
            </div>
        </div>
    `;
}

news.innerHTML = articles.map((el) => createArticleHTML(el)).join('');

const deleteArticle = (elem) => {
    const targetElement = elem.closest('.row');

    elem.closest('.row').remove();

    const articleIndex = articles.findIndex(
        (it) => +targetElement.dataset.id === it.id
    );
    articles.splice(articleIndex, 1);
    localStorage.setItem(lsKey, JSON.stringify(articles));
};

const editArticle = (elem) => {
    const targetElement = elem.closest('.row');

    const title = prompt("Enter new's title: ");
    const content = prompt("Enter new's content: ");

    if (!title || !content) {
        alert("You've entered incorrect information!");
        return;
    } else {
        const article = articles.find(
            (it) => +targetElement.dataset.id === it.id
        );
        article.title = title;
        article.content = content;

        localStorage.setItem(lsKey, JSON.stringify(articles));
        targetElement.querySelector('.title').textContent = title;
        targetElement.querySelector('.content').textContent = content;
    }
};

news.addEventListener('click', ({ target }) => {
    if (target.closest('.del')) {
        deleteArticle(target);
    } else if (target.closest('.edit')) {
        editArticle(target);
    }
});

addNewArticle.addEventListener('click', () => {
    const title = prompt("Enter new's title: ");
    const content = prompt("Enter new's content: ");

    if (!title || !content) {
        alert("You've entered incorrect information!");
        return;
    } else {
        const newArticle = {
            id: Date.now(),
            title,
            content,
        };
        articles.push(newArticle);
        localStorage.setItem(lsKey, JSON.stringify(articles));
        news.insertAdjacentHTML('beforeend', createArticleHTML(newArticle));
    }
});

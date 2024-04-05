'use strict';

// TASK 01
//На странице есть список элементов, каждый из которых имеет атрибут data-price, содержащий цену товара. Создайте функцию, которая принимает максимальную цену и скрывает все элементы с ценой выше указанной значения.

const filterElementsByDataAttribute = (attributeName, maxPrice) => {
    const elements = Array.from(
        document.querySelectorAll(`[${attributeName}]`)
    );
    elements.forEach((element) => {
        const price = parseFloat(element.getAttribute(attributeName));
        if (price > maxPrice) {
            element.style.display = 'none';
        }
    });
};

// Пример использования:
filterElementsByDataAttribute('data-price', 50);

//На странице есть список элементов, каждый из которых имеет атрибут data-rating, содержащий рейтинг товара. Создайте функцию, которая сортирует элементы в порядке убывания рейтинга и переставляет их на странице в соответствии с новым порядком.

const sortElementsByDataAttribute = (attributeName) => {
    const rating = document.querySelector('.rating');
    const elements = Array.from(rating.querySelectorAll(`[${attributeName}]`));
    elements.sort((a, b) => {
        const ratingA = parseInt(a.getAttribute(attributeName));
        const ratingB = parseInt(b.getAttribute(attributeName));
        return ratingB - ratingA;
    });
    elements.forEach((element) => {
        rating.appendChild(element);
    });
};

// Пример использования:
sortElementsByDataAttribute('data-rating');

// TASK 02
// Показывать и скрывать контент по клику на чекбокс

const checkbox = document.getElementById('toggleCheckbox');
const content02 = document.querySelector('.content02');

checkbox.addEventListener('change', function (e) {
    if (this.checked) {
        content02.classList.add('visible');
    } else {
        content02.classList.remove('visible');
    }
});

// Task 03
//preloader
// waiting full load of the page
// Ждем полной загрузки страницы
window.addEventListener('load', function (e) {
    const contentEl = document.querySelector('.content03');
    contentEl.classList.remove('hidden');
    const loaderEl = document.querySelector('.loader');
    loaderEl.style.display = 'none';
});

// TASK 04
// Погружение и всплытие
// при погружении addEventListener с параметром true
// при всплытие без параметра, по дефолту там false

for (let element of document.querySelectorAll('*')) {
    element.addEventListener(
        'click',
        function (e) {
            // console.log(`Down ${element.tagName}`);
        },
        true
    );
    element.addEventListener('click', function (e) {
        // console.log(`Up ${element.tagName}`);
    });
}

// TASK 05
// Modal window

const modal = document.getElementById('modal');
const openModalBtn = document.querySelector('.open-modal-btn');

openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

document.addEventListener('mousedown', function (event) {
    if (!modal.contains(event.target) && event.target !== openModalBtn) {
        modal.style.display = 'none';
    }
});

// TASK 06
//autoclicker dispatchEvent isTrusted
// Создаем событие клика
const clickEvent = new Event('click');

// Добавляем обработчик события на элемент
const button = document.querySelector('#btn');
button.addEventListener('click', function (e) {
    console.log('Нажали на кнопку');
});

// Имитируем клик на кнопке
button.dispatchEvent(clickEvent);

// Проверка на доверенность - это пользователь нажал или dispatchEvent(clickEvent)
button.addEventListener('click', function (event) {
    if (event.isTrusted) {
        console.log('Клик событие является доверенным');
    } else {
        console.log('Клик событие не является доверенным');
    }
});

// Симуляция клика
function simulateClick() {
    const clickEvent = new Event('click', { bubbles: true });
    button.dispatchEvent(clickEvent);
}

setTimeout(simulateClick, 2000); // Имитация клика через 2 секунды

// TASK 07
//EVENTS from keyboard, mouse etc

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach((item) => {
    item.addEventListener('mouseover', function (e) {
        item.style.backgroundColor = '#f0ff';
    });
    item.addEventListener('mouseout', function (e) {
        item.style.backgroundColor = '#f0f0f0';
    });
    item.addEventListener('click', function (e) {
        console.log(item.textContent);
    });
});

// TASK 08
// keyboard event
// show alert after pressing key and display it
document.addEventListener('keydown', function (event) {
    alert(`You've pressed ${event.code}!`);
});

// TASK 09
//Game about circle which is moving from cursor
// Поймай кружок мышкой и нажми на него
document.addEventListener('DOMContentLoaded', () => {
    const circle = document.querySelector('.circle');
    let isMoving = false;

    circle.addEventListener('mouseover', () => {
        if (!isMoving) {
            const randomTop = Math.random() * window.innerHeight;
            const randomLeft = Math.random() * window.innerWidth;
            circle.style.top = `${randomTop}px`;
            circle.style.left = `${randomLeft}px`;
        }
    });

    circle.addEventListener('mousedown', () => {
        isMoving = true;
        circle.style.backgroundColor = 'blue';
    });

    circle.addEventListener('mouseup', () => {
        isMoving = false;
        circle.style.backgroundColor = 'red';
    });
});

// TASK 10
// Infinity scroll

window.addEventListener('scroll', () => {
    document.getElementById('showScroll').innerHTML = scrollY + 'px';
});

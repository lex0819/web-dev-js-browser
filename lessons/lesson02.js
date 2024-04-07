'use strict';

// Задание 1 (тайминг 15 минут)
// Вам необходимо создать навигационное меню для веб-сайта, в котором меняется активный пункт при клике без фактического перехода на другие страницы. Меню должно обладать следующими характеристиками:
// 1. Подсветка активного пункта: При клике на пункт меню он должен становиться активным, и для активного пункта должен применяться определенный стиль (например, изменение цвета фона). Если выбрать другой пункт, предыдущий должен перестать быть активным.
// 2. Эффекты наведения: При наведении курсора на пункты меню должны применяться эффекты (например, изменение цвета текста или фона) для подсказки пользователю, что пункт меню является интерактивным.

const menu = document.querySelector('.menu-list');

menu.addEventListener('click', ({ target }) => {
    const link = target.closest('.menu-item');
    if (link) {
        menu.querySelector('.menu-item.active')?.classList.remove('active');
        link.classList.add('active');
    }
});

// Задание 2 (тайминг 15 минут)
// Создайте простое модальное окно, которое появляется при клике на кнопку "Открыть модальное окно" и закрывается при клике на кнопку "Закрыть". Модальное окно должно содержать заголовок "Модальное окно" и кнопку для закрытия.
// * Модальное окно должно плавно появляться и исчезать при открытии и закрытии.

const modal = document.querySelector('.modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');

openModalBtn.addEventListener('click', () => {
    modal.style.transform = 'translateX(-50%) translateY(-50%)';
});

closeModalBtn.addEventListener(
    'click',
    () => (modal.style.transform = 'translateX(calc(-100vw - 150%))')
);
document.addEventListener('click', ({ target }) => {
    if (!modal.contains(target) && openModalBtn !== target) {
        modal.style.transform = 'translateX(calc(-100vw - 150%))';
    }
});

// Задание 3 (тайминг 10 минут)
// У вас есть кнопка "Купить". Создайте скрипт, который при клике на эту кнопку меняет её текст на "Товар добавлен в корзину" в течение 2 секунд, а затем возвращает исходный текст "Купить". В обработчике события клика также проверьте, является ли событие доверенным. Если событие является доверенным, выполните изменение текста кнопки и убедитесь, что после 2 секунд текст возвращается в исходное состояние.

const buyBtn = document.getElementById('buy');
buyBtn.addEventListener('click', function (ev) {
    if (ev.isTrusted) {
        // is click trusted? - yes!
        this.textContent = 'Товар добавлен в корзину';
        this.disabled = true; //blocking button during timeout
        setTimeout(() => {
            this.textContent = 'Купить';
            this.disabled = false; //unblocking button after finish timeout
        }, 2000);
    }
});

// Задание 4 (тайминг 20 минут)
// Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность для этого опросника, используя HTML, CSS и JavaScript.
// 1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен иметь несколько вариантов ответов.
// 2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
// 3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
// 4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
// вопросы, и отобразить выбранные им варианты ответов.
// 5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
// на все вопросы перед завершением опроса.
// 6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
// пользовательского опыта.

const endBtn = document.getElementById('end');
const result = document.querySelector('.result');
const formQuest = document.forms.quest;

const questions = Array.from(formQuest.querySelectorAll('fieldset')).map(
    (it) => {
        return {
            question: it.name,
            answer: it.value,
        };
    }
);

function getAnswers() {
    for (let i = 0; i < questions.length; i++) {
        let fieldSetName = questions[i].question;
        console.log(fieldSetName);

        let fieldSet = formQuest.querySelector(fieldSetName);
        console.log(fieldSet);
        // questions[i].answer = formQuest.fieldSet.value;
    }
}

function findEmptyFieldSet() {
    for (let i = 0; i < questions.length; i++) {
        formQuest;
    }
}

endBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    getAnswers();
    const checked = formQuest.querySelector('input:checked');
    if (!checked) {
    }
});

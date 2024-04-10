'use strict';

// Задание 2. Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием Unsplash API, выполните следующие шаги:
// 1. Зарегистрируйтесь на Unsplash:
// ○ Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// ○ Нажмите кнопку "Join" или "Регистрация", чтобы создать аккаунт, если у вас его еще нет.
// ○ Войдите в свой аккаунт Unsplash.
// 2. Создайте приложение:
// ○ После входа в аккаунт Unsplash, перейдите на страницу разработчика Unsplash // (https://unsplash.com/developers).
// ○ Нажмите "New Application" (Новое приложение).
// ○ Заполните информацию о вашем приложении, такую как имя, описание и сайт (вы можете использовать http://localhost для тестового сайта).
// ○ После заполнения информации, нажмите "Create Application" (Создать приложение).
// 3. Получите API-ключ:
// ○ После создания приложения, вы получите API-ключ. Этот ключ будет отображаться в вашей панели управления приложением.
// ○ API-ключ представляет собой строку вида YOUR_ACCESS_KEY.
const TOKEN = 's-ljjs7MUleOTxDsLFRsuysU9Tm-cglOfrqcjkKGUuo';
// 4. Измените код HTML и JavaScript:
// ○ Откройте вашу HTML-страницу в текстовом редакторе или интегрированной среде разработки.
// ○ Замените 'YOUR_ACCESS_KEY' в коде JavaScript на ваш собственный API-ключ.
// Реализуйте бесконечную ленту с фотографиями.

const photoContainer = document.getElementById('photo-container');
let page = 1;
let isFetching = false;
let scrollPos = document.body.getBoundingClientRect().top;
let timeOut = undefined;

async function fetchPhotos(page) {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos?page=${page}&client_id=${TOKEN}`
        );
        if (!response.ok) {
            throw new Error('Error of upload data');
        }
        const photos = await response.json();
        return photos;
        // see uploading in the Network Tab on the Browser
    } catch (error) {
        // console.error('Ошибка при загрузке фотографий:', error);
        throw error;
        return [];
    } finally {
        isFetching = false;
    }
}

function addPhotosHtml(data) {
    for (const obj of data) {
        photoContainer.insertAdjacentHTML(
            'beforeend',
            `
        <div class="photo">
            <img src="${obj.urls.full}" alt="${obj.alt_description}"/>
        </div>
        `
        );
    }
}

async function loadMorePhotos(page) {
    try {
        const data = await fetchPhotos(page);
        addPhotosHtml(data);
    } catch (err) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `Error during uploading photos: ${err.message}`;
        photoContainer.append(errorMessage);
    }
}

// Загрузка первой партии фотографий при загрузке страницы
window.onload = () => loadMorePhotos(page);

window.addEventListener('scroll', async () => {
    if (isFetching) {
        return;
    }
    //позиция оконного прямоугольника
    if (scrollPos < document.body.getBoundingClientRect().top) {
        return;
    }
    //ставим задержку на скрол в 200 мс, чтоб не дергалось слишком часто
    if (timeOut) {
        window.clearTimeout(timeOut);
    }

    //оборачиваем в сеттаймаут для предотвращения слишком частого реагирования на скрол
    timeOut = window.setTimeout(async () => {
        const percentPage =
            (window.scrollY /
                (document.body.clientHeight - window.innerHeight)) *
            100;
        if (percentPage >= 90) {
            isFetching = true;
            page++;
            scrollPos = document.body.getBoundingClientRect().top;
            // loadMorePhotos(page);
            try {
                const data = await fetchPhotos(page);
                addPhotosHtml(data);
            } catch (err) {
                alert(`Error during uploading photos: ${err.message}`);
            }
        }
    }, 200);
});

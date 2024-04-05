'use strict';

const data = [
    { name: 'gym', time: '2023-12-17 13:24:00', max: 5, current: 0 },
    { name: 'basketball', time: '2023-12-20 15:00:00', max: 9, current: 0 },
    { name: 'football', time: '2023-12-18 15:00:00', max: 8, current: 0 },
    { name: 'dance', time: '2023-12-19 15:00:00', max: 7, current: 0 },
    { name: 'yoga', time: '2023-12-21 15:00:00', max: 6, current: 0 },
];

const app = document.getElementById('app');

function createDataHTML(elem) {
    return `
    <div class="row">
        <div class="col p-2">
            <h3>${elem.name}</h3>  <strong>${elem.time}</strong>
        </div>
        <div class="col p-2">
            Максимально в группе <b class="text-primary">${elem.max}</b> человек,  записалось <i class="text-success">${elem.current}</i>
        </div>
        <div class="col p-1">
            <button type="button" class="btn btn-success add m-2">Записаться</button>
            <button type="button" class="btn btn-danger remove m-2">Отменить запись</button>
        </div>
    </div>
    `;
}

const addDataItem = (item) => {
    const listItem = item.closest('.row');
    const targetName = listItem.querySelector('h3').textContent;
    const max = Number.parseInt(
        listItem.querySelector('.text-primary').textContent
    );
    const current = listItem.querySelector('.text-success');
    let count = Number.parseInt(current.textContent);
    if (count < max) {
        count += 1;
        current.textContent = count;
        if (count >= max) {
            item.setAttribute('disabled', true);
        }
        const dataItem = data.find((it) => targetName === it.name);
        dataItem.current = count;
    }
};

const removeDataItem = (item) => {
    const listItem = item.closest('.row');
    const targetName = listItem.querySelector('h3').textContent;
    const max = Number.parseInt(
        listItem.querySelector('.text-primary').textContent
    );
    const current = listItem.querySelector('.text-success');
    let count = Number.parseInt(current.textContent);
    const addBtn = listItem.querySelector('.add');
    if (count > 0) {
        count -= 1;
    }
    current.textContent = count;
    const dataItem = data.find((it) => targetName === it.name);
    dataItem.current = count;
    if (count < max) {
        addBtn.removeAttribute('disabled');
    }
};

app.innerHTML = data.map((item) => createDataHTML(item)).join('');

app.addEventListener('click', ({ target }) => {
    if (target.classList.contains('add')) {
        addDataItem(target);
    }

    if (target.classList.contains('remove')) {
        removeDataItem(target);
    }
});

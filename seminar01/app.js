'use strict';

const data = [
    { name: 'gym', time: '2023-12-17 13:24:00', max: 5, current: 0 },
    { name: 'basketball', time: '2023-12-20 15:00:00', max: 9, current: 0 },
    { name: 'football', time: '2023-12-18 15:00:00', max: 8, current: 0 },
    { name: 'dance', time: '2023-12-19 15:00:00', max: 7, current: 0 },
    { name: 'yoga', time: '2023-12-21 15:00:00', max: 6, current: 0 },
];

const app = document.getElementById('app');

const showData = () => {
    app.innerHTML = '';
    data.forEach((item) => {
        const listItem = document.createElement('div');
        listItem.classList.add('container');
        listItem.classList.add('text-center');
        listItem.innerHTML = `
            <div class="row">
                <div class="col p-2">
                <h3>${item.name}</h3>  <strong>${item.time}</strong>
                </div>
                <div class="col p-2">
                Максимально в группе <b class="text-primary">${item.max}</b> человек,  записалось <i class="text-success">${item.current}</i>
                </div>
                <div class="col p-1">
                <button type="button" class="btn btn-success add m-2">Записаться</button>
                <button type="button" class="btn btn-danger remove m-2">Отменить запись</button>
                </div>
            </div>
        `;
        if (item.current >= item.max) {
            listItem.querySelector('.add').setAttribute('disabled', '');
        }

        app.appendChild(listItem);
    });
};

showData();

app.addEventListener('click', (e) => {
    const btn = e.target;
    const listItem = btn.closest('.row');
    const max = Number.parseInt(
        listItem.querySelector('.text-primary').textContent
    );
    const current = listItem.querySelector('.text-success');
    let count = Number.parseInt(current.textContent);

    if (btn.classList.contains('add')) {
        if (count < max) {
            count += 1;
            current.textContent = count;
            if (count >= max) {
                btn.setAttribute('disabled', true);
            }
        }
    }

    if (btn.classList.contains('remove')) {
        const addBtn = listItem.querySelector('.add');
        if (count > 0) {
            count -= 1;
        }
        current.textContent = count;

        if (count < max) {
            addBtn.removeAttribute('disabled');
        }
    }
});

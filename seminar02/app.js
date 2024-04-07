'use strict';

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const pagination = document.querySelector('.slider__pagination');

const sliderList = document.querySelectorAll('.slider__item');
const paginationList = document.querySelectorAll('.slider__pagination-dot');

function getCurrentSlide() {
    const currentSlide = document.querySelector(
        '.slider__item.slider__item-active'
    );
    const currentPagination = document.querySelector(
        '.slider__pagination-dot.dot-active'
    );
    const currentIndex = Array.from(sliderList).findIndex(
        (item) => currentSlide === item
    );
    currentSlide.classList.remove('slider__item-active');
    currentPagination.classList.remove('dot-active');

    return currentIndex;
}

nextBtn.addEventListener('click', () => {
    const currentIndex = getCurrentSlide();
    if (currentIndex < sliderList.length - 1) {
        sliderList[currentIndex + 1].classList.add('slider__item-active');
        paginationList[currentIndex + 1].classList.add('dot-active');
    } else {
        sliderList[0].classList.add('slider__item-active');
        paginationList[0].classList.add('dot-active');
    }
});

prevBtn.addEventListener('click', () => {
    const currentIndex = getCurrentSlide();
    if (currentIndex > 0) {
        sliderList[currentIndex - 1].classList.add('slider__item-active');
        paginationList[currentIndex - 1].classList.add('dot-active');
    } else {
        sliderList[sliderList.length - 1].classList.add('slider__item-active');
        paginationList[sliderList.length - 1].classList.add('dot-active');
    }
});

pagination.addEventListener('click', ({ target }) => {
    const clickIndex = Array.from(paginationList).findIndex(
        (item) => target === item
    );
    getCurrentSlide();
    sliderList[clickIndex].classList.add('slider__item-active');
    target.classList.add('dot-active');
});

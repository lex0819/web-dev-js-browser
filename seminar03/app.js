'use strict';

const TOKEN = 's-ljjs7MUleOTxDsLFRsuysU9Tm-cglOfrqcjkKGUuo';
const pic = document.getElementById('pic'); // innerHTML
const prev = document.querySelector('.prev'); // btn to previous photo

// save likes to localStorage
const likeUnsplash = localStorage.likeUnsplash
    ? JSON.parse(localStorage.getItem('likeUnsplash'))
    : [];

// save viewed photos to localStorage
const previousPhotos = localStorage.prevUnsplash
    ? JSON.parse(localStorage.getItem('prevUnsplash'))
    : [];

// counter of viewed photos to localStorage
let countViewedPhotos = previousPhotos.length;

// set disabled btn to prev photo if they are not
prev.disabled = countViewedPhotos === 0;

// get one random photo from unsplash
const randomPhoto = `https://api.unsplash.com/photos/random?client_id=${TOKEN}`;

// main function fetch
const fetchPhoto = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Server is not reachable');
        }
        const data = await response.json();
        console.log(data); // for comfortable control what did we get
        return data;
    } catch (err) {
        throw err;
        return {};
    }
};

// return HTML code to browser
const createPhotoHtml = (objPhoto) => {
    let photoDiv = `<div class="card" style="width: 48rem;">
            <img src="${objPhoto.urls.full}" class="card-img-top" alt="${
        objPhoto.alternative_slugs
    }">
            <div class="card-body">
                <h5 class="card-title">${
                    objPhoto.user.name
                } ${objPhoto.created_at.substring(0, 10)}</h5>
                <p class="card-text">${objPhoto.alt_description}</p>
                `;
    const likesCounter = likeUnsplash.find((item) => objPhoto.id === item.id);
    if (likesCounter) {
        photoDiv += `<button type="button" class="btn btn-primary like-unsplash" disabled>
                    likes: ${objPhoto.likes + 1}
                </button>
            </div>
        </div>
        `;
    } else {
        photoDiv += `<button type="button" class="btn btn-primary like-unsplash">
                    likes: ${objPhoto.likes}
                </button>
            </div>
        </div>
        `;
    }
    pic.innerHTML = photoDiv;
};

// click to prev photos
prev.addEventListener('click', async () => {
    if (countViewedPhotos > 0) {
        const lastPhotoId = previousPhotos[countViewedPhotos - 1];
        const lastUrl = `https://api.unsplash.com/photos/${lastPhotoId}?client_id=${TOKEN}`;

        const lastPhoto = await fetchPhoto(lastUrl);
        createPhotoHtml(lastPhoto);
        countViewedPhotos--;
    } else {
        prev.disabled = true;
    }
});

// main
window.addEventListener('load', async () => {
    // main
    try {
        const photo = await fetchPhoto(randomPhoto);
        createPhotoHtml(photo);
        previousPhotos.push(photo.id);
        localStorage.setItem('prevUnsplash', JSON.stringify(previousPhotos));

        const likesBtn = document.querySelector('.like-unsplash');

        // click Like btn
        likesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            likeUnsplash.push({
                id: photo.id,
                likes: photo.likes + 1,
            });
            localStorage.setItem('likeUnsplash', JSON.stringify(likeUnsplash));
            likesBtn.textContent = `likes: ${photo.likes + 1}`;
            likesBtn.disabled = true;

            // try to upload to unsplash server user's like
            // may be to need USER_AUTH_TOKEN
            // not DEVELOPER_TOKEN
            fetch(`https://api.unsplash.com/photos/${photo.id}/like`, {
                method: 'POST',
                headers: {
                    Authorization: TOKEN,
                },
            })
                .then((res) => res.json())
                .then((json) => console.log('POST unsplash.com', json));
        });
    } catch (err) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = `Error during uploading photos: ${err.message}`;
        pic.append(errorMessage);
    }
});

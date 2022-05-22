import { galleryItems } from './gallery-items.js';

const refs = {
    wrapGallery: document.querySelector("div.gallery"),
}

const markupGalleryItems = createsPictureCards(galleryItems);

refs.wrapGallery.insertAdjacentHTML("beforeend", markupGalleryItems)

refs.wrapGallery.addEventListener('click', openPicture)


function createsPictureCards(items) {
    return items.map(({ preview, original, description }) => {
            return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
        </div> `
        })
        .join('')

}

function openPicture(e) {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    e.preventDefault();

    const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}">`,
    );
    instance.show()

    document.addEventListener('keydown', closePicture);

    function closePicture(e) {
        console.log(e);
        if (e.code === 'Escape') {
            document.removeEventListener('keydown', closePicture);
        }
        return instance.close();
    }
}
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
        `<img src="${e.target.dataset.source}">`, {
            closable: true,
            onClose: () => {
                document.removeEventListener('keydown', closePicture);
            },
            onShow: () => {
                document.addEventListener('keydown', closePicture);
            },
        });

    instance.show()

    function closePicture(e) {
        console.log(e);
        if (e.code === 'Escape') {
            return instance.close();
        }
    }
}
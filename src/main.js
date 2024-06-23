//================================================================
// imports
import { photoCardsTemplate } from './js/render-functions';
import { getPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// params
const refs = {
  form: document.querySelector('.entry-form'),
  input: document.querySelector('.entry-form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.next-page'),
};

const iziParams = {
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  message:
    'Sorry, there are no images matching<br>' +
    'your search query.Please try again!',
  position: 'topRight',
};

const simpleParams = {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
};

const perPage = 15;
let gallery;
let currentPage = 1;
let maxPage = 10;
let query = '';

// functions
function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

function showLoadMore() {
  refs.loadMore.classList.remove('visually-hidden');
}

function hideLoadMore() {
  refs.loadMore.classList.add('visually-hidden');
}

function smoothScroll() {
  const liElemHeight = refs.gallery.children[0].getBoundingClientRect().height;
  const gap = 24;
  window.scrollBy({
    top: 2 * liElemHeight + gap,
    behavior: 'smooth',
  });
}

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();

    if (maxPage) {
      iziToast.info({
        position: 'topRight',
        messageColor: '#FFFFFF',
        message:
          "We're sorry, but you've reached<br> the end of search results.",
      });
    }
  } else {
    showLoadMore();
  }
}

async function onPhotosSearch(query) {
  showLoader();
  hideLoadMore();
  currentPage = 1;
  refs.gallery.innerHTML = '';

  try {
    const data = await getPhotos(query, currentPage);

    if (data.hits.length === 0) {
      iziToast.error(iziParams);
      return;
    }
    //перевірка на порожню відповідь

    maxPage = Math.ceil(data.totalHits / perPage);
    const markup = photoCardsTemplate(data.hits);
    refs.gallery.innerHTML = markup;
    updateBtnStatus();

    gallery = new SimpleLightbox('.gallery a', simpleParams);
    gallery.refresh();
    gallery.on('show.simplelightbox');
  } catch (error) {
    iziToast.error({ ...iziParams, message: error.toString() });
  } finally {
    hideLoader();
  }
}

//event listeners
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  query = refs.input.value.trim();
  onPhotosSearch(query);
  refs.form.reset();
});

refs.loadMore.addEventListener('click', async () => {
  currentPage++;
  hideLoadMore();
  showLoader();

  try {
    const data = await getPhotos(query, currentPage);
    const markup = photoCardsTemplate(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    updateBtnStatus();
    smoothScroll();

    gallery.refresh();
    gallery.on('show.simplelightbox');
  } catch (error) {
    iziToast.error({ ...iziParams, message: error.toString() });
  } finally {
    hideLoader();
  }
});

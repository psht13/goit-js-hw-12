//================================================================
// variables
const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';

// functions
export function getPhotos(query) {
  // форматую ввід користувача
  query = query.toLowerCase().split(' ').join('+').toString();

  //параметри пошуку
  const params = new URLSearchParams({
    key: '44424725-c6298a470a26677f9f5105ec2',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  //   кінцеве посилання
  const url = `${BASE_URL}${END_POINT}?${params}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}

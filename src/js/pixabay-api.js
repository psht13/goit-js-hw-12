//================================================================
// imports
import axios from 'axios';

// axios instance
const api = axios.create({
  baseURL: 'https://pixabay.com',
});

// variables
const END_POINT = '/api/';

// functions
export async function getPhotos(query, page) {
  // форматую ввід користувача
  query = query.toLowerCase().split(' ').join('+').toString();

  // params
  const params = {
    key: '44424725-c6298a470a26677f9f5105ec2',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  };

  const result = await api.get(END_POINT, { params });
  return result.data;
}

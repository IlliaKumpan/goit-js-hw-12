import axios from 'axios';
import { createGallery } from "./render-functions.js";
const API_KEY = '54668130-3dbf133d1de2adf3be7a098c3'; 
const BASE_URL = 'https://pixabay.com/api/';
const fetchPostsBtn = document.querySelector('#load-btn');
let page = 1;

export default async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',      
    orientation: 'horizontal', 
    safesearch: true,
    per_page: 15,
    _page: page
    
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; 
  } catch (error) {
      console.error("Info about error", error);
    throw error;
  }
}


fetchPostsBtn.addEventListener('click', async () => {
    try {
    const data = await getImagesByQuery();
    createGallery(data.hits);
    page += 1;

    if (page > 1) {
      fetchPostsBtn.textContent = "Load more";
    }
  } catch (error) {
    console.log(error);
  }
});
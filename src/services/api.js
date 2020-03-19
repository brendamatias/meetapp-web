import axios from 'axios';

const api = axios.create({
  baseURL: 'https://meetapp-bootcamp.herokuapp.com',
});

export default api;

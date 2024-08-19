import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const baseUrl = 'http://localhost:8000';

export const URL_API_PAYPAL = 'http://localhost:8000/api/paypal';

export default instance;

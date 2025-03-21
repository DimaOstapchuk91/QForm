import axios from 'axios';

export const questionnairesAPI = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://qform-back.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

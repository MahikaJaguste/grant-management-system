import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const STATIC_FLAG = true;

export default instance;
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://urlshortnerserver.onrender.com/url'
})
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://urlshortnerdg.herokuapp.com/url'
})
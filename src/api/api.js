import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default API;

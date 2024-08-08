import axios from 'axios';

import Cookies from 'js-cookie';

const csrf = Cookies.get('csrftoken');
const API_URL = process.env.REACT_APP_API_URL

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const fetchProducts = () => api.get('/products/');

export const fetchProduct = (productId) => api.get(`/products/${productId}/`);
export const createProduct = (productData) => api.post('/products/', productData);
export const updateImage = (productId, formData) => api.post(`/products/${productId}/upload-image/`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const addStock = (productId, stockData) => api.post(`/products/${productId}/add_stock/`, stockData);
export const removeStock = (productId, stockData) => api.post(`/products/${productId}/remove_stock/`, stockData);
export const login = (credentials) => api.post('/token/', credentials);
export const logout = () => api.post('/logout/',{
    headers: {
     'X-CSRFToken':csrf, 
    }
   });

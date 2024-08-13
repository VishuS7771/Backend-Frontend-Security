// src/axiosInstance.js
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://172.16.13.46:8080/api',
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {       
        return Promise.reject(error);
    }
);


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {debugger
//         if (error.response && error.response.status === 401) {
           
//             window.location.href = '/unauthorized'; 
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;

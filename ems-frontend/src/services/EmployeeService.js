import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: 'http://172.16.13.46:8080/api/employees',
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

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
          
            window.location.href = '/unauthorized';
        }
        return Promise.reject(error);
    }
);

export const listEmployees = () => axiosInstance.get('/list');
export const createEmployee = (employee) => axiosInstance.post('/create', employee);
export const getEmployee = (employeeId) => axiosInstance.get(`/getById/${employeeId}`);
export const updateEmployee = (employeeId, employee) => axiosInstance.put(`/update/${employeeId}`, employee);
export const deleteEmployee = (employeeId) => axiosInstance.delete(`/delete/${employeeId}`);
export const gethelloWorld = () => axiosInstance.get('/get');

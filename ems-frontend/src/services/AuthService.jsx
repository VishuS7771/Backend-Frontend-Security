import axios from 'axios';

export const loginUser = async ({ username, password }) => {
    const response = await axios.post('http://172.16.13.46:8080/api/auth/login', { username, password });

    const token = response.data.accessToken;
    localStorage.setItem('token', token);
    return token;
};

export const registerUser = async ({ username, password }) => {
    const response = await axios.post('http://172.16.13.46:8080/api/auth/register', { username, password });
   
};



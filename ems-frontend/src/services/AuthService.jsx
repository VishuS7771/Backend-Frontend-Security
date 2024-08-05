import axios from 'axios';

export const loginUser = async ({ username, password, login }) => {
    const response = await axios.post('http://172.16.13.46:8080/api/auth/login', { username, password });

    const token = response.data.accessToken;
    const userId = response.data.userId;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    login(token, userId);

    return token;
};

export const registerUser = async ({ username, password }) => {
    await axios.post('http://172.16.13.46:8080/api/auth/register', { username, password });
};

import axios from 'axios';

export const loginUser = async ({ username, password, login }) => {debugger
    const response = await axios.post('http://172.16.13.46:8080/api/auth/login', { username, password });

    const token = response.data.accessToken;
    const EmpId = response.data.empId;
    
    localStorage.setItem('token', token);
    localStorage.setItem('EmpId', EmpId);

    login(token, EmpId);

    return token;
};

export const registerUser = async ({ username, password }) => {
    await axios.post('http://172.16.13.46:8080/api/auth/register', { username, password });
};



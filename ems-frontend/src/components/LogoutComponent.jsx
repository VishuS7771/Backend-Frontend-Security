import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LogoutComponent = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('http://localhost:8080/api/auth/logout', {}, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                localStorage.removeItem('token'); 
                logout(); 
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutComponent;

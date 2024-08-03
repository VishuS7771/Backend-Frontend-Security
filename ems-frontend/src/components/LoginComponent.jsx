import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser({ username, password });
            login(token); 
            navigate('/employees'); 
        } catch (error) {
            alert('Login failed, Please try again.');
            console.error('Login failed', error);
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
        textAlign: 'center',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        width: '100%',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const linkStyle = {
        marginTop: '10px',
        color: '#007bff',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit' style={buttonStyle}>Login</button>
                <Link to='/register' style={linkStyle}>Sign Up</Link>
            </form>
        </div>
    );
};

export default LoginComponent;

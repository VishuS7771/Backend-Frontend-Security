import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await registerUser({ username, password });
            alert('Registration successful! Please log in.');
            navigate('/'); // Navigate to login page after successful registration
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed. Please try again.');
        }
    };

    // Inline styles
    const containerStyle = {
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        textAlign: 'center',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
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
            <h2>Register</h2>
            <form style={formStyle} onSubmit={handleRegister}>
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
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type='submit' style={buttonStyle}>Register</button>
            </form>
            <Link to='/' style={linkStyle}>Login</Link>
        </div>
    );
};

export default RegisterComponent;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/AuthService';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordMessageColor, setPasswordMessageColor] = useState('black');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [confirmPasswordMessageColor, setConfirmPasswordMessageColor] = useState('black');
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [isTypingConfirmPassword, setIsTypingConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(password);
        const isValidLength = password.length >= 6;
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsTypingPassword(true);

        if (!validatePassword(newPassword)) {
            setPasswordMessage('Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
            setPasswordMessageColor('red');
        } else {
            setPasswordMessage('');
            setPasswordMessageColor('green');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsTypingConfirmPassword(true);

        if (password !== newConfirmPassword) {
            setConfirmPasswordMessage('Passwords do not match.');
            setConfirmPasswordMessageColor('red');
        } else {
            setConfirmPasswordMessage('Passwords match.');
            setConfirmPasswordMessageColor('green');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            alert("Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
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

    const messageStyle = {
        fontSize: '14px',
        marginTop: '10px',
        textAlign: 'center',
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
                    onChange={handlePasswordChange}
                    onFocus={() => setIsTypingPassword(true)}
                    onBlur={() => setIsTypingPassword(false)}
                    required
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => setIsTypingConfirmPassword(true)}
                    onBlur={() => setIsTypingConfirmPassword(false)}
                    required
                />
                <button type='submit' style={buttonStyle}>Register</button>
                
            </form>
            <Link to='/' style={linkStyle}>Login</Link>
            {(isTypingPassword || passwordMessage) && (
                    <div style={{ ...messageStyle, color: passwordMessageColor }}>
                        {passwordMessage}
                    </div>
                )}
                {(isTypingConfirmPassword || confirmPasswordMessage) && (
                    <div style={{ ...messageStyle, color: confirmPasswordMessageColor }}>
                        {confirmPasswordMessage}
                    </div>
                )}
        </div>
    );
};

export default RegisterComponent;

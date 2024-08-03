// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (validatePassword(password)) {
      // Handle registration logic here
      console.log('Registering with:', { username, password, phone });
      navigate('/login'); // Redirect to login page after registration
    } else {
      setPasswordError('Password must be at least 6 characters long and contain a number.');
    }
  };

  const validatePassword = (password) => {
    // Simple password validation
    return password.length >= 6 && /\d/.test(password);
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
    backgroundColor: '#007bff', // Bootstrap primary button color
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
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
          type='text'
          placeholder='Phone Number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {passwordError && <div style={errorStyle}>{passwordError}</div>}
        <button type='submit' style={buttonStyle}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

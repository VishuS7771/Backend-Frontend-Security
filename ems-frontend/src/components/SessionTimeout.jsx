import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SessionTimeout = ({ timeout = 30 * 60 * 1000 }) => { 
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        let timeoutId;

        const resetTimeout = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                handleLogout();
            }, timeout);
        };

        const handleLogout = () => {
            logout();
            setSessionExpired(true);
            alert('Session expired please log in again');
            navigate('/login');
        };

        const events = ['mousemove', 'mousedown', 'click', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => window.addEventListener(event, resetTimeout));

        resetTimeout();

        return () => {
            events.forEach(event => window.removeEventListener(event, resetTimeout));
            clearTimeout(timeoutId);
        };
    }, [logout, timeout, navigate]);

    return sessionExpired ? (  
        <div style={{ position: 'fixed', top: 0, width: '100%', textAlign: 'center', backgroundColor: 'red', color: 'white', padding: '10px' }}>
            Session Expired. Please log in again.
        </div>
    ) : null;
};

export default SessionTimeout;

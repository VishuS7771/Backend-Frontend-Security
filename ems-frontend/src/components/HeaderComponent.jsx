import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import { AuthContext } from '../context/AuthContext';

const HeaderComponent = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [dateTime, setDateTime] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        return date.toLocaleString();
    };

    const handleLogoClick = () => {
        if (isAuthenticated) {
            navigate('/employees');
        } else {
            navigate('/');
        }
    };

    const headerStyle = {
        backgroundColor: 'rgb(3, 14, 3)',
        padding: '0.5rem 1rem',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const dateStyle = {
        color: 'white',
        marginRight: '1rem',
    };

    const linkStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.5rem 1rem',
        textDecoration: 'none',
        borderRadius: '0.25rem',
    };

    return (
        <div>
            <header style={headerStyle}>
                <nav style={navStyle}>
                    <div
                        onClick={handleLogoClick}
                        style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}
                    >
                        Employee Management System
                    </div>
                    <div style={dateStyle}>
                        {formatDateTime(dateTime)}
                    </div>
                   
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;

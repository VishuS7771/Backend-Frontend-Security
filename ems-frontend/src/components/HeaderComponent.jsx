import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LeftAccordion from './LeftAccordion';
import { AuthContext } from '../context/AuthContext';

const HeaderComponent = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true); 
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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleAccordion = () => {
        setIsOpen(prevState => !prevState);
    };

    const headerStyle = {
        backgroundColor: 'rgb(3, 14, 3)',
        padding: '0.5rem 1rem',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const toggleButtonStyle = {
        width: '40px',
        height: '40px',
        backgroundColor: 'rgb(3, 14, 3)', // same as header background
        border: 'none',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 1001, // Ensure it sits on top of other content
    };

    const dateStyle = {
        color: 'white',
        marginRight: '1rem',
    };

    return (
        <header style={headerStyle}>
            <div style={logoContainerStyle}>
               {isAuthenticated && <button style={toggleButtonStyle} onClick={toggleAccordion}>
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>}
                <div onClick={handleLogoClick} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                    Employee Management System
                </div>
            </div>
            <div style={dateStyle}>
                {formatDateTime(dateTime)}
            </div>
            <LeftAccordion isOpen={isOpen} handleLogout={handleLogout} />
        </header>
    );
};

export default HeaderComponent;

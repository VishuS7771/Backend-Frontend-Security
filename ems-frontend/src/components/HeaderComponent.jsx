import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import LeftAccordion from './LeftAccordion';
import ProfileComponent from './ProfileComponent'; 
import { AuthContext } from '../context/AuthContext';

const HeaderComponent = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true); 
    const [dateTime, setDateTime] = useState(new Date());
    const [showProfilePopup, setShowProfilePopup] = useState(false); 
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

    const handleProfileClick = () => {
        setShowProfilePopup(true); 
    };

    const handleClosePopup = () => {
        setShowProfilePopup(false); 
    };

    const headerStyle = {
        backgroundColor: 'rgb(3, 14, 3)',
        padding: '0.5rem 1rem',
        width: '100%',
        position: 'fixed',
        height: '50px',
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

    const dateStyle = {
        color: 'white',
        marginRight: '1rem',
    };

    const profileIconStyle = {
        color: 'white',
        cursor: 'pointer',
    };

    return (
        <header style={headerStyle}>
            <div style={logoContainerStyle}>
                <div onClick={handleLogoClick} style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                    Employee Management System
                </div>
            </div>
            <div style={dateStyle}>
                {formatDateTime(dateTime)}
            </div>
            {isAuthenticated &&
            <div style={profileIconStyle} onClick={handleProfileClick}>
                <FaUserCircle size={30} />
            </div>}
            <LeftAccordion isOpen={isOpen} />
            {showProfilePopup  &&<ProfileComponent onClose={handleClosePopup} />} {/* Render ProfileComponent as a popup */}
        </header>
    );
};

export default HeaderComponent;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const LeftAccordion = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(true); 
    const navigate = useNavigate();

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleAccordion = () => {
        setIsOpen(prevState => !prevState);
    };

    const accordionStyle = {
        width: isOpen ? '250px' : '0',
        position: 'fixed',
        top: '40px', 
        left: 0,
        height: 'calc(100% - 60px)',
        backgroundColor: '#f4f4f4',
        padding: isOpen ? '1rem' : '0',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        transition: 'width 0.3s, padding 0.3s',
        zIndex: 1000, 
    };

    const toggleButtonStyle = {
        position: 'fixed',
        top: '40px',
        left: isOpen ? '250px' : '0',
        width: '40px',
        height: '40px',
        backgroundColor: 'transparent',
        color: '#333', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'left 0.3s', 
        zIndex: 1000, 
    };
    

    const linkStyle = {
        display: 'block',
        padding: '10px',
        textDecoration: 'none',
        color: '#333',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: '#eaeaea',
    };

    return (
        <>
            <div style={accordionStyle}>
                <Link to="/employees" style={linkStyle}>Employees</Link>
                <Link to="/add-employee" style={linkStyle}>Add Employee</Link>
                <Link to="/encrypt" style={linkStyle}>Encrypt Data</Link>
                <div style={linkStyle} onClick={handleLogout}>Logout</div>
            </div>
            <button style={toggleButtonStyle} onClick={toggleAccordion}>
                {isOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
            </button>
        </>
    );
};

export default LeftAccordion;

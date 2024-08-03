import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LeftAccordion = ({ isOpen, handleLogout }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return null;

    const accordionStyle = {
        width: isOpen ? '250px' : '0',
        position: 'fixed',
        top: '60px', 
        left: 0,
        height: 'calc(100% - 60px)',
        backgroundColor: '#f4f4f4',
        padding: isOpen ? '1rem' : '0',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        transition: 'width 0.3s, padding 0.3s',
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
        <div style={accordionStyle}>
            <Link to="/employees" style={linkStyle}>Employees</Link>
            <Link to="/add-employee" style={linkStyle}>Add Employee</Link>
            <Link to="/encrypt" style={linkStyle}>Encrypt Data</Link>
            <div style={linkStyle} onClick={handleLogout}>Logout</div>
        </div>
    );
};

export default LeftAccordion;

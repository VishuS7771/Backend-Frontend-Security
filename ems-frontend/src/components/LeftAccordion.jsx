import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';

const LeftAccordion = ({ isOpen, handleLogout }) => {
    const { isAuthenticated, EmpId } = useContext(AuthContext);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [hasPunchedOutToday, setHasPunchedOutToday] = useState(false);

    useEffect(() => {
        const fetchClockStatus = async () => {
            try {
                const response = await axiosInstance.get(`/attendance/clock-status/${EmpId}`);
                const { clockedIn, hasPunchedOutToday } = response.data; // Ensure these keys match your backend response
                setIsClockedIn(clockedIn);
                setHasPunchedOutToday(hasPunchedOutToday);

                // Save to localStorage to persist state across page reloads
                localStorage.setItem('hasPunchedOutToday', hasPunchedOutToday);
                console.log('Clock status fetched:', response.data);
            } catch (error) {
                console.error('Error fetching clock status:', error);
            }
        };

        if (EmpId) {
            fetchClockStatus();
        }

        // Retrieve from localStorage on component mount
        const storedPunchOutStatus = localStorage.getItem('hasPunchedOutToday');
        if (storedPunchOutStatus !== null) {
            setHasPunchedOutToday(JSON.parse(storedPunchOutStatus));
            console.log('Retrieved punch out status from localStorage:', JSON.parse(storedPunchOutStatus));
        }
    }, [EmpId]);

    const handlePunchInOut = async () => {
        if (hasPunchedOutToday) {
            console.log('Punch action prevented, already punched out today');
            return;
        }
    
        try {
            if (isClockedIn) {
                await axiosInstance.post(`/attendance/clockOut/${EmpId}`);
                setIsClockedIn(false);
                setHasPunchedOutToday(true);
                localStorage.setItem('hasPunchedOutToday', true); // Update localStorage
                console.log('Punched out successfully');
            } else {
                await axiosInstance.post(`/attendance/clockIn/${EmpId}`);
                setIsClockedIn(true);
                setHasPunchedOutToday(false);
                localStorage.setItem('hasPunchedOutToday', false); // Update localStorage
                console.log('Punched in successfully');
            }
        } catch (error) {
            console.error('Error handling punch in/out:', error);
        }
    };

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

    const activeLinkStyle = {
        backgroundColor: '#ddd',
        fontWeight: 'bold',
    };

    const buttonStyle = {
        display: 'block',
        padding: '8px',
        textDecoration: 'none',
        color: '#fff',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: isClockedIn ? '#b71c1c' : '#388e3c',
        cursor: hasPunchedOutToday ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        fontSize: '14px',
        opacity: hasPunchedOutToday ? '0.6' : '1',
    };

    return (
        <div style={accordionStyle}>
            <div
                style={buttonStyle}
                onClick={handlePunchInOut}
                aria-disabled={hasPunchedOutToday ? 'true' : 'false'}
            >
                {isClockedIn ? 'Punch Out' : 'Punch In'}
            </div>
            <NavLink to="/employees" style={linkStyle} activeStyle={activeLinkStyle}>Employees</NavLink>
            <NavLink to="/add-employee" style={linkStyle} activeStyle={activeLinkStyle}>Add Employee</NavLink>
            <NavLink to="/Attendance" style={linkStyle} activeStyle={activeLinkStyle}>Attendance</NavLink>
            <NavLink to="/leave-request" style={linkStyle} activeStyle={activeLinkStyle}>Leave Request</NavLink>
            <div style={linkStyle} onClick={handleLogout}>Logout</div>
            <NavLink to="/encrypt" style={linkStyle} activeStyle={activeLinkStyle}>Encrypt Data</NavLink>
        </div>
    );
};

export default LeftAccordion;

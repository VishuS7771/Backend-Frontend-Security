import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';

const LeftAccordion = ({ isOpen, handleLogout }) => {
    const { isAuthenticated, userId } = useContext(AuthContext);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [hasPunchedOutToday, setHasPunchedOutToday] = useState(false);

    useEffect(() => {
        const fetchClockStatus = async () => {
            try {
                const response = await axiosInstance.get(`/attendance/clock-status/${userId}`);
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

        if (userId) {
            fetchClockStatus();
        }

        // Retrieve from localStorage on component mount
        const storedPunchOutStatus = localStorage.getItem('hasPunchedOutToday');
        if (storedPunchOutStatus !== null) {
            setHasPunchedOutToday(JSON.parse(storedPunchOutStatus));
            console.log('Retrieved punch out status from localStorage:', JSON.parse(storedPunchOutStatus));
        }
    }, [userId]);

    const handlePunchInOut = async () => {
        if (hasPunchedOutToday) {
            console.log('Punch action prevented, already punched out today');
            return;
        }
    
        try {
            if (isClockedIn) {
                await axiosInstance.post(`/attendance/clockOut/${userId}`);
                setIsClockedIn(false);
                setHasPunchedOutToday(true);
                localStorage.setItem('hasPunchedOutToday', true); // Update localStorage
                console.log('Punched out successfully');
            } else {
                await axiosInstance.post(`/attendance/clockIn/${userId}`);
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
            <Link to="/employees" style={linkStyle}>Employees</Link>
            <Link to="/add-employee" style={linkStyle}>Add Employee</Link>
            <Link to="/Attendance" style={linkStyle}>Attendance</Link>
            <Link to="/leave-request" style={linkStyle}>Leave Request</Link>
            <div style={linkStyle} onClick={handleLogout}>Logout</div>
            <Link to="/encrypt" style={linkStyle}>Encrypt Data</Link>
        </div>
    );
};

export default LeftAccordion;

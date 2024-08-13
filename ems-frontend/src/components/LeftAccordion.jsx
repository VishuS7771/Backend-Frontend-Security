import React, { useContext, useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../services/axiosInstance';

const LeftAccordion = ({ isOpen }) => {
    const { EmpId , isAuthenticated,logout } = useContext(AuthContext);
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [hasPunchedOutToday, setHasPunchedOutToday] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchClockStatus = async () => {
            try {
                const response = await axiosInstance.get(`/attendance/clock-status/${EmpId}`);
                const { clockedIn, hasPunchedOutToday } = response.data;
                setIsClockedIn(clockedIn);
                setHasPunchedOutToday(hasPunchedOutToday);

                localStorage.setItem('hasPunchedOutToday', hasPunchedOutToday);
            } catch (error) {
                console.error('Error fetching clock status:', error);
            }
        };

        if (EmpId) {
            fetchClockStatus();
        }

        const storedPunchOutStatus = localStorage.getItem('hasPunchedOutToday');
        if (storedPunchOutStatus !== null) {
            setHasPunchedOutToday(JSON.parse(storedPunchOutStatus));
        }
    }, [EmpId]);

    const handlePunchInOut = async () => {
        if (hasPunchedOutToday) {
            return;
        }

        try {
            if (isClockedIn) {
                await axiosInstance.post(`/attendance/clockOut/${EmpId}`);
                setIsClockedIn(false);
                setHasPunchedOutToday(true);
                localStorage.setItem('hasPunchedOutToday', true);
            } else {
                await axiosInstance.post(`/attendance/clockIn/${EmpId}`);
                setIsClockedIn(true);
                setHasPunchedOutToday(false);
                localStorage.setItem('hasPunchedOutToday', false);
            }
        } catch (error) {
            console.error('Error handling punch in/out:', error);
        }
    };

    if (!isAuthenticated) return null;

    const accordionStyle = {
        width: isOpen ? '250px' : '0',
        position: 'fixed',
        top: '50px',
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
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axiosInstance.post('/auth/logout', {}, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                logout();
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out', error);
        }
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
            <NavLink to="/Applied-request" style={linkStyle} activeStyle={activeLinkStyle}>Applied Leaves</NavLink>
            <NavLink style={linkStyle} onClick={handleLogout}>Logout</NavLink>
            <NavLink to="/encrypt" style={linkStyle} activeStyle={activeLinkStyle}>Encrypt Data</NavLink>
        </div>
    );
};

export default LeftAccordion;

import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const AttendanceComponent = () => {
    const { userId } = useContext(AuthContext);
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        fetchAttendanceData(currentMonth);
    }, [currentMonth]);

    const fetchAttendanceData = async (month) => {
        try {
            const year = month.getFullYear();
            const monthValue = String(month.getMonth() + 1).padStart(2, '0');
            const response = await axiosInstance.get(`/attendance/getAttendance/${userId}`, {
                params: { year, month: monthValue }
            });
            setAttendanceData(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleMonthChange = (offset) => {
        const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + offset));
        setCurrentMonth(newMonth);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const renderAttendanceRows = () => {
        return attendanceData.map((attendance,index) => (
            <tr key={attendance.attendanceId} style={styles.tableRow}>
                 <td style={styles.tableCell}>{index + 1}</td>
                <td style={styles.tableCell}>{formatDate(attendance.date)}</td>
                <td style={styles.tableCell}>{formatTime(attendance.clockIn)}</td>
                <td style={styles.tableCell}>{formatTime(attendance.clockOut)}</td>
                <td style={styles.tableCell}>{attendance.totalHours}</td>
                <td style={styles.tableCell}>{attendance.status}</td>
                <td style={styles.tableCell}>{attendance.description}</td>
            </tr>
        ));
    };

    return (
        <div style={styles.container}>
            <h2>Attendance Records</h2>
            <div style={styles.monthNavigation}>
                <button style={styles.button} onClick={() => handleMonthChange(-1)}>Previous Month</button>
                <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button style={styles.button} onClick={() => handleMonthChange(1)}>Next Month</button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>SR.No</th>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Clock In</th>
                        <th style={styles.tableHeader}>Clock Out</th>
                        <th style={styles.tableHeader}>Total Hours</th>
                        <th style={styles.tableHeader}>Status</th>
                        <th style={styles.tableHeader}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAttendanceRows()}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    monthNavigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        padding: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#f4f4f4',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
};

export default AttendanceComponent;

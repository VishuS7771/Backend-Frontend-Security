import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const AttendanceComponent = () => {
    const { EmpId } = useContext(AuthContext);
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [displayMonth, setDisplayMonth] = useState(new Date().getMonth() + 1);
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
    const [dateOfJoining, setDateOfJoining] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axiosInstance.get(`/employees/getById/${EmpId}`);
                setDateOfJoining(new Date(response.data.dateOfJoining));
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployeeData();
    }, [EmpId]);

    useEffect(() => {
        if (dateOfJoining) {
            fetchAttendanceData(displayYear, displayMonth);
        }
    }, [displayYear, displayMonth, dateOfJoining]);

    const fetchAttendanceData = async (year, month) => {
        try {
            const response = await axiosInstance.get(`/attendance/getAttendance/${EmpId}`, {
                params: { year, month: String(month).padStart(2, '0') }
            });
            const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setAttendanceData(sortedData);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleSearch = () => {
        setDisplayYear(selectedYear);
        setDisplayMonth(selectedMonth);
    };

    const handleReset = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        setSelectedYear(currentYear);
        setSelectedMonth(currentMonth);
        setDisplayYear(currentYear);
        setDisplayMonth(currentMonth);
    };

    const getMonthDays = (year, month) => {
        const date = new Date(year, month - 1, 1);
        const days = [];
        while (date.getMonth() === month - 1) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB').replace(/\//g, '-'); // dd-mm-yy format
    };

    const formatClockInOut = (clockIn, clockOut) => {
        if (!clockIn && !clockOut) return 'No Data';
        const inTime = clockIn ? new Date(clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
        const outTime = clockOut ? new Date(clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
        return clockOut ? `In: ${inTime} Out: ${outTime}` : `In: ${inTime}`;
    };

    const calculateTotalHours = (clockIn, clockOut) => {
        if (!clockIn || !clockOut) return 'N/A';
        const start = new Date(clockIn);
        const end = new Date(clockOut);
        const diff = (end - start) / 3600000; // Difference in hours
        return `${diff.toFixed(2)} hours`;
    };

    const isWeeklyOff = (date) => {
        const day = date.getDay();
        if (day === 0) return true; // Sunday
        if (day === 6 && getWeekOfMonth(date) === 2) return true; // Second Saturday
        return false;
    };

    const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const day = date.getDate();
        return Math.ceil((day + firstDay) / 7);
    };

    const renderCalendar = () => {
        if (!dateOfJoining) return null; // Wait until dateOfJoining is fetched

        const daysInMonth = getMonthDays(displayYear, displayMonth);
        const firstDayOfMonth = new Date(displayYear, displayMonth - 1, 1).getDay();
        const totalDays = daysInMonth.length + firstDayOfMonth;
        const weeks = [];
        const today = new Date();

        let week = [];
        for (let i = 0; i < totalDays; i++) {
            if (i < firstDayOfMonth) {
                week.push(<div key={`empty-${i}`} style={styles.day}></div>);
            } else {
                const day = daysInMonth[i - firstDayOfMonth];
                const attendance = attendanceData.find(
                    (data) => new Date(data.date).toDateString() === day.toDateString()
                );
                const hasAttendance = Boolean(attendance);
                const isPastDate = day <= today;
                const isWeeklyOffDay = isWeeklyOff(day);
                const isBeforeJoining = day < dateOfJoining  && day.toDateString() !== dateOfJoining.toDateString();;

                week.push(
                    <div
                        key={day}
                        style={{
                            ...styles.day,
                            backgroundColor: isBeforeJoining
                                ? '#e9ecef' // Light gray for before date of joining
                                : isWeeklyOffDay && isPastDate
                                    ? 'skyblue' // sky blue for weekly off
                                    : (hasAttendance ? '#d4edda' : (isPastDate ? '#f8d7da' : '#e9ecef')), // Light green for attendance, light red for no attendance, light gray for future
                        }}
                    >
                        <div style={styles.date}>{formatDate(day)}</div>
                        {isWeeklyOffDay && isPastDate && (
                            <div style={styles.weeklyOff}>Weekly Off</div>
                        )}
                        {isPastDate && !isBeforeJoining && (
                            <div style={styles.attendance}>
                                {hasAttendance ? (
                                    <>
                                        <div>{formatClockInOut(attendance.clockIn, attendance.clockOut)}</div>
                                        {attendance.clockOut && (
                                            <div>{calculateTotalHours(attendance.clockIn, attendance.clockOut)}</div>
                                        )}
                                    </>
                                ) : (
                                    <div>Absent</div>
                                )}
                            </div>
                        )}
                    </div>
                );
            }
            if (week.length === 7) {
                weeks.push(<div key={`week-${weeks.length}`} style={styles.week}>{week}</div>);
                week = [];
            }
        }
        if (week.length > 0) {
            // Fill the last week with empty divs if necessary
            while (week.length < 7) {
                week.push(<div key={`empty-end-${week.length}`} style={styles.day}></div>);
            }
            weeks.push(<div key={`week-${weeks.length}`} style={styles.week}>{week}</div>);
        }
        return weeks;
    };

    return (
        <div style={styles.container}>
            <h2>Attendance Calendar</h2>
            <div style={styles.filterContainer}>
                <label style={styles.label}>Year</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={styles.select}
                >
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label style={styles.label}>Month</label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={styles.monthSelect}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</option>
                    ))}
                </select>
                <button style={styles.button} onClick={handleSearch}>Search</button>
                <button style={styles.button} onClick={handleReset}>Reset</button>
            </div>
            <div style={styles.calendar}>
                <div style={styles.dayNames}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
                        <div key={dayName} style={styles.dayName}>{dayName}</div>
                    ))}
                </div>
                <div style={styles.calendarBody}>
                    {renderCalendar()}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    label: {
        marginRight: '10px',
    },
    select: {
        padding: '10px',
        marginRight: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    monthSelect: {
        padding: '10px',
        marginRight: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        marginRight: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    calendar: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    dayNames: {
        display: 'flex',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f1f1f1',
    },
    dayName: {
        flex: '1 0 14.28%',
        textAlign: 'center',
         fontWeight: 'bold',
        padding: '10px',
        borderRight: '1px solid #ddd',
    },
    calendarBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    week: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    day: {
        flex: '1 0 14.28%', // Adjust to ensure equal box sizes
        height: '100px',
        boxSizing: 'border-box',
        border: '1px solid #ddd',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: '5px',
    },
    date: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    attendance: {
        marginTop: '10px',
    },
    weeklyOff: {
        color: '#fff',
        backgroundColor: '#001f3f',
        padding: '5px',
        borderRadius: '4px',
    }
};

export default AttendanceComponent;

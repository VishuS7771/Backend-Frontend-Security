import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance'; 
import { useNavigate } from 'react-router-dom';

const LeaveRequestComponent = () => {
    const [leave, setLeave] = useState({
        leaveId: '',
        EmpId: '', // Make sure to handle this correctly
        leaveTypeId: '',
        startDate: '',
        endDate: '',
        totalLeave: '',
        remarks: '',
        status: '',
    });
    
    const [appliedLeaves, setAppliedLeaves] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]); 
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch leave types from the correct API endpoint
        axiosInstance.get('/leaveType/leaveType') 
            .then(response => {
                console.log(response);
                setLeaveTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching leave types:', error);
            });

        // Fetch applied leaves for the user
        const EmpId = localStorage.getItem('EmpId');
        if (EmpId) {
            axiosInstance.get(`/leave/user/${EmpId}`) 
                .then(response => {
                    setAppliedLeaves(response.data);
                })
                .catch(error => {
                    console.error('Error fetching applied leaves:', error);
                });
        } else {
            console.error('User ID not found in localStorage');
        }
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const applyLeave = (e) => {
        e.preventDefault();

        if (validateForm()) {debugger
            const EmpId = localStorage.getItem('EmpId');
            if (EmpId) {
                const leaveWithEmpId = {
                    ...leave,
                    EmpId: EmpId,
                    totalLeave: calculateTotalLeave(leave.startDate, leave.endDate) // Calculate total leave
                };
                
                axiosInstance.post('/leave/apply', leaveWithEmpId)
                    .then(response => {
                        alert('Leave applied successfully');
                        navigate('/leave-request');
                    })
                    .catch(error => {
                        console.error('Error applying leave:', error);
                    });
            } else {
                console.error('User ID not found in localStorage');
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {};

        if (!leave.startDate) {
            errorsCopy.startDate = 'Start Date is required';
            valid = false;
        }
        
        if (!leave.endDate) {
            errorsCopy.endDate = 'End Date is required';
            valid = false;
        }
        
        setErrors(errorsCopy);
        return valid;
    };

    const calculateTotalLeave = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including start and end dates
        return diffDays;
    };

    // Function to get leave type name from leaveTypes array
    const getLeaveType = (leaveTypeId) => {
        const leaveType = leaveTypes.find(type => type.leaveTypeId === leaveTypeId);
        return leaveType ? leaveType.leaveType : 'Unknown';
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Apply Leave</h2>
            <div className='card'>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label>Leave Type:</label>
                            <select
                                name='leaveTypeId'
                                value={leave.leaveTypeId}
                                onChange={handleChange}
                                className={`form-control ${errors.leaveTypeId ? 'is-invalid' : ''}`}
                            >
                                <option value=''>--Select Leave Type--</option>
                                {leaveTypes.map(type => (
                                    <option key={type.leaveTypeId} value={type.leaveTypeId}>
                                        {type.leaveType}
                                    </option>
                                ))}
                            </select>
                            {errors.leaveTypeId && <div className='invalid-feedback'>{errors.leaveTypeId}</div>}
                        </div>
                        
                        <div className='form-group'>
                            <label>Start Date:</label>
                            <input
                                type='date'
                                name='startDate'
                                value={leave.startDate}
                                onChange={handleChange}
                                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            />
                            {errors.startDate && <div className='invalid-feedback'>{errors.startDate}</div>}
                        </div>

                        <div className='form-group'>
                            <label>End Date:</label>
                            <input
                                type='date'
                                name='endDate'
                                value={leave.endDate}
                                onChange={handleChange}
                                className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            />
                            {errors.endDate && <div className='invalid-feedback'>{errors.endDate}</div>}
                        </div>
                        <div className='form-group'>
                            <label>Remarks:</label>
                            <textarea
                                name='remarks'
                                value={leave.remarks}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>

                        <button className='btn btn-success' onClick={applyLeave}>Apply Leave</button>
                    </form>

                    <h3 className='mt-4'>Previously Applied Leaves</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Leave Id</th>
                                <th>Leave Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Total Leave</th>
                                <th>Remarks</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appliedLeaves.map(leave => (
                                <tr key={leave.leaveId}>
                                    <td>{leave.leaveId}</td>
                                    <td>{leave.leaveType.leaveType}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leave.totalLeave}</td>
                                    <td>{leave.remarks}</td>
                                    <td>{leave.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveRequestComponent;

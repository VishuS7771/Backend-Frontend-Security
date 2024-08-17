import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance'; 
import { useNavigate, useLocation } from 'react-router-dom';

const ApplyLeaveComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [leave, setLeave] = useState({
        leaveId: '',
        empId: '',
        leaveTypeId: '',
        startDate: '',
        endDate: '',
        totalLeave: '',
        remarks: '',
        status: '',
    });

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axiosInstance.get('/leaveType/gettypes')
            .then(response => {
                setLeaveTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching leave types:', error);
            });

        if (location.state && location.state.leave) {
            setLeave(location.state.leave);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const applyLeave = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const EmpId = localStorage.getItem('EmpId');
            if (EmpId) {
                const leaveWithEmpId = {
                    ...leave,
                    empId: EmpId,
                    totalLeave: calculateTotalLeave(leave.startDate, leave.endDate)
                };

                if (leave.leaveId) {
                 
                    axiosInstance.put(`/leave/${leave.leaveId}`, leaveWithEmpId)
                        .then(response => {
                            alert('Leave updated successfully');
                            navigate('/Applied-request');
                        })
                        .catch(error => {
                            console.error('Error updating leave:', error);
                        });
                } else {
                    
                    axiosInstance.post('/leave/apply', leaveWithEmpId)
                        .then(response => {
                            alert('Leave applied successfully');
                            navigate('/Applied-request');
                        })
                        .catch(error => {
                            console.error('Error applying leave:', error);
                        });
                }
            } else {
                console.error('User ID not found in localStorage');
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {};

        if (!leave.leaveTypeId) {
            errorsCopy.leaveTypeId = 'Leave Type is required';
            valid = false;
        }

        if (!leave.startDate) {
            errorsCopy.startDate = 'Start Date is required';
            valid = false;
        }
        
        if (!leave.endDate) {
            errorsCopy.endDate = 'End Date is required';
            valid = false;
        } else if (new Date(leave.endDate) < new Date(leave.startDate)) {
            errorsCopy.endDate = 'End Date cannot be earlier than Start Date';
            valid = false;
        }
        
        setErrors(errorsCopy);
        return valid;
    };

    const calculateTotalLeave = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    };

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Apply Leave</h2>
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={applyLeave}>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Leave Type:</label>
                            <select
                                name='leaveTypeId'
                                value={leave.leaveTypeId}
                                onChange={handleChange}
                                className={`form-select ${errors.leaveTypeId ? 'is-invalid' : ''}`}
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
                        
                        <div className='form-group mb-3'>
                            <label className='form-label'>Start Date:</label>
                            <input
                                type='date'
                                name='startDate'
                                value={leave.startDate}
                                onChange={handleChange}
                                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            />
                            {errors.startDate && <div className='invalid-feedback'>{errors.startDate}</div>}
                        </div>

                        <div className='form-group mb-3'>
                            <label className='form-label'>End Date:</label>
                            <input
                                type='date'
                                name='endDate'
                                value={leave.endDate}
                                onChange={handleChange}
                                className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            />
                            {errors.endDate && <div className='invalid-feedback'>{errors.endDate}</div>}
                        </div>

                        <div className='form-group mb-3'>
                            <label className='form-label'>Remarks:</label>
                            <textarea
                                name='remarks'
                                value={leave.remarks}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>

                        <button type='submit' className='btn btn-success'>
                            {leave.leaveId ? 'Update Leave' : 'Apply Leave'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeaveComponent;

import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setMobileNo(response.data.mobileNo);
            }).catch(error => {
                console.error('Error fetching employee:', error);
            });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email, mobileNo };

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log('Update response:', response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error('Error updating employee:', error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log('Create response:', response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error('Error creating employee:', error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        // Validate First Name
        if (/^[a-zA-Z]+$/.test(firstName.trim())) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name must contain only characters';
            valid = false;
        }

        // Validate Last Name
        if (/^[a-zA-Z]+$/.test(lastName.trim())) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name must contain only characters';
            valid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email.trim())) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Invalid email format';
            valid = false;
        }

        // Validate Mobile No
        const mobileNoRegex = /^\d{10}$/;
        if (mobileNoRegex.test(mobileNo.trim())) {
            errorsCopy.mobileNo = '';
        } else {
            errorsCopy.mobileNo = 'Mobile No must be 10 digits long and contain only numbers';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Mobile No:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Mobile No'
                                    name='mobileNo'
                                    value={mobileNo}
                                    className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                />
                                {errors.mobileNo && <div className='invalid-feedback'>{errors.mobileNo}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;

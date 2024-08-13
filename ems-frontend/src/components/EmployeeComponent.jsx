import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        empId: '',
        name: '',
        designationId: '',
        email: '',
        mobileNo: '',
        userTypeId: '',
        currentAddress: '',
        permanentAddress: '',
        departmentId: '',
        dateOfJoining: '',
        dateOfBirth: '',
        state: '',
        branch: '',
        product: '',
        reportingManager: '',
        manager: '',
        hrManager: '',
        payrollManager: '',
    });

    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [errors, setErrors] = useState({});
    const [userTypes, setUserTypes] = useState([]);
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/department/getAll')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });

        axiosInstance.get('/usertype/getall')
            .then(response => {
                setUserTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching user types:', error);
            });

        if (id) {
            getEmployee(id).then((response) => {
                setEmployee(response.data);

                if (response.data.departmentId) {
                    fetchDesignations(response.data.departmentId);
                }
            }).catch(error => {
                console.error('Error fetching employee:', error);
            });
        }
    }, [id]);

    const fetchDesignations = (departmentId) => {
        axiosInstance.get(`/designation/getdeslist/${departmentId}`)
            .then(response => {
                setDesignations(response.data);
            })
            .catch(error => {
                console.error('Error fetching designations:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'departmentId') {
            fetchDesignations(value);
        }
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    navigate('/employees');
                }).catch(error => {
                    console.error('Error updating employee:', error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    alert("The employee has registered successfully on EMS.\n\n" +
                        "Username: " + response.data.email + "\n" +
                        "Password: " + response.data.password);

                    navigate('/employees');
                }).catch(error => {
                    console.error('Error creating employee:', error);
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {};

        if (/^[a-zA-Z\s]+$/.test(employee.name.trim())) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name must contain only characters';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(employee.email.trim())) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Invalid email format';
            valid = false;
        }

        const mobileNoRegex = /^\d{10}$/;
        if (mobileNoRegex.test(employee.mobileNo.trim())) {
            errorsCopy.mobileNo = '';
        } else {
            errorsCopy.mobileNo = 'Mobile No must be 10 digits long and contain only numbers';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => {
        return id ? <h2 className='text-center'>Update Employee</h2> : <h2 className='text-center'>Add Employee</h2>;
    };

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-8 offset-md-2'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Name:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Employee Name'
                                            name='name'
                                            value={employee.name}
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Email:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Employee Email'
                                            name='email'
                                            value={employee.email}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Mobile No:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Employee Mobile No'
                                            name='mobileNo'
                                            value={employee.mobileNo}
                                            className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                        />
                                        {errors.mobileNo && <div className='invalid-feedback'>{errors.mobileNo}</div>}
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Department:</label>
                                        <select
                                            name='departmentId'
                                            value={employee.departmentId || ''}
                                            className='form-control'
                                            onChange={handleChange}
                                        >
                                            <option value=''>--Select Department--</option>
                                            {departments.map(dept => (
                                                <option key={dept.departmentId} value={dept.departmentId}>
                                                    {dept.departmentName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Designation:</label>
                                        <select
                                            name='designationId'
                                            value={employee.designationId || ''}
                                            className='form-control'
                                            onChange={handleChange}
                                        >
                                            <option value=''>--Select Designation--</option>
                                            {designations.map(desig => (
                                                <option key={desig.designationId} value={desig.designationId}>
                                                    {desig.designationName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>User Type:</label>
                                        <select
                                            name='userTypeId'
                                            value={employee.userTypeId || ''}
                                            className='form-control'
                                            onChange={handleChange}
                                        >
                                            <option value=''>--Select User Type--</option>
                                            {userTypes.map(userType => (
                                                <option key={userType.userTypeId} value={userType.userTypeId}>
                                                    {userType.userType}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Current Address:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Current Address'
                                            name='currentAddress'
                                            value={employee.currentAddress}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Permanent Address:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Permanent Address'
                                            name='permanentAddress'
                                            value={employee.permanentAddress}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Date of Joining:</label>
                                        <input
                                            type='date'
                                            name='dateOfJoining'
                                            value={employee.dateOfJoining}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Date of Birth:</label>
                                        <input
                                            type='date'
                                            name='dateOfBirth'
                                            value={employee.dateOfBirth}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>State:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter State'
                                            name='state'
                                            value={employee.state}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Branch:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Branch'
                                            name='branch'
                                            value={employee.branch}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Product:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Product'
                                            name='product'
                                            value={employee.product}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Manager:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Manager'
                                            name='manager'
                                            value={employee.manager}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>HR Manager:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter HR Manager'
                                            name='hrManager'
                                            value={employee.hrManager}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='form-label'>Payroll Manager:</label>
                                        <input
                                            type='text'
                                            placeholder='Enter Payroll Manager'
                                            name='payrollManager'
                                            value={employee.payrollManager}
                                            className='form-control'
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save</button>
                            <button className='btn btn-danger' onClick={() => navigate('/employees')} style={{ marginLeft: '10px' }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;

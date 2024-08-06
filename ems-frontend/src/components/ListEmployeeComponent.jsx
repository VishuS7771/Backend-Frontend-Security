import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import '../css/ListEmployeeComponent.css'; 

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error('Error fetching employees:', error);
        });
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch(error => {
            console.error('Error deleting employee:', error);
        });
    }

    return (
        <div className='employee-container'>
            <h2 className='text-center'>List of Employees</h2>
            <table className='employee-table'>
    <thead>
        <tr>
            <th>SR.No</th> {/* Auto-incrementing number column */} 
            <th>Employee  Name</th>
            <th>Employee Address</th>
            <th>Employee Email</th>
            <th>Employee Mobile</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {employees.map((employee, index) => (
            <tr key={employee.empId}>
                <td>{index + 1}</td> {/* Auto-incrementing number */}
                <td>{employee.name}</td>
                <td>{employee.currentAddress}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td className='employee-actions'>
                    <button className='btn-info' onClick={() => updateEmployee(employee.empId)}>Edit</button>
                    <button className='btn-danger' onClick={() => removeEmployee(employee.empId)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
};

export default ListEmployeeComponent;

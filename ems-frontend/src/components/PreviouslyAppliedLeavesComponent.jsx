import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from 'react-icons/fa';

const PreviouslyAppliedLeavesComponent = () => {
    const [appliedLeaves, setAppliedLeaves] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppliedLeaves = async () => {
            try {
                const EmpId = localStorage.getItem('EmpId');
                if (EmpId) {
                    const response = await axiosInstance.get(`/leave/user/${EmpId}`);
                    setAppliedLeaves(response.data);
                }
            } catch (error) {
                console.error('Error fetching applied leaves:', error);
            }
        };

        fetchAppliedLeaves();
    }, []);

    const handleEdit = (leave) => {
        setSelectedLeave(leave);
        setShowEditModal(true);
    };

    const handleDelete = async (leaveId) => {
        try {
            await axiosInstance.delete(`/leave/delete/${leaveId}`);
            setAppliedLeaves(appliedLeaves.filter(leave => leave.leaveId !== leaveId));
        } catch (error) {
            console.error('Error deleting leave:', error);
        }
    };

    const handleApprove = async (leaveId) => {
        try {
            await axiosInstance.post(`/leave/approveLeave/${leaveId}`);
            setAppliedLeaves(appliedLeaves.map(leave => 
                leave.leaveId === leaveId ? { ...leave, status: 'Approved' } : leave
            ));
        } catch (error) {
            console.error("Error approving leave:", error);
        }
    };

    const handleReject = async (leaveId) => {
        try {
            await axiosInstance.post(`/leave/rejectLeave/${leaveId}`);
            setAppliedLeaves(appliedLeaves.map(leave => 
                leave.leaveId === leaveId ? { ...leave, status: 'Rejected' } : leave
            ));
        } catch (error) {
            console.error("Error rejecting leave:", error);
        }
    };

    const handleRedirect = () => {
        navigate('/leave-request');
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '20px'
    };

    const cellStyle = {
        border: '1px solid #dee2e6',
        padding: '8px',
        textAlign: 'left'
    };

    const headerStyle = {
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        padding: '8px'
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Previously Applied Leaves</h2>
            <div className='d-flex justify-content-end mb-3'>
                <Button variant='primary' onClick={handleRedirect}>Apply Leave</Button>
            </div>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={headerStyle}>Leave Id</th>
                        <th style={headerStyle}>Emp Id</th>
                        <th style={headerStyle}>Employee Name</th>
                        <th style={headerStyle}>Leave Type</th>
                        <th style={headerStyle}>Start Date</th>
                        <th style={headerStyle}>End Date</th>
                        <th style={headerStyle}>Total Leave</th>
                        <th style={headerStyle}>Remarks</th>
                        <th style={headerStyle}>Status</th>
                        <th style={headerStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appliedLeaves.map(leave => (
                        <tr key={leave.leaveId}>
                            <td style={cellStyle}>{leave.leaveId}</td>
                            <td style={cellStyle}>{leave.employee.empId}</td>
                            <td style={cellStyle}>{leave.employee.name}</td>
                            <td style={cellStyle}>{leave.leaveType.leaveType}</td>
                            <td style={cellStyle}>{leave.startDate}</td>
                            <td style={cellStyle}>{leave.endDate}</td>
                            <td style={cellStyle}>{leave.totalLeave}</td>
                            <td style={cellStyle}>{leave.remarks}</td>
                            <td style={cellStyle}>{leave.status}</td>
                            <td style={cellStyle}>
                                <span>
                                    <FaEdit
                                        style={{ color: 'orange', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleEdit(leave)}
                                    />
                                    <FaTrashAlt
                                        style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleDelete(leave.leaveId)}
                                    />
                                    <FaCheck
                                        style={{ color: 'green', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleApprove(leave.leaveId)}
                                    />
                                    <FaTimes
                                        style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleReject(leave.leaveId)}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedLeave && (
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Leave Type</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={selectedLeave.leaveType.leaveType}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={selectedLeave.startDate}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={selectedLeave.endDate}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Remarks</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    value={selectedLeave.remarks}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={selectedLeave.status}
                                    readOnly
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant='primary' onClick={() => {/* Handle save changes */}}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PreviouslyAppliedLeavesComponent;

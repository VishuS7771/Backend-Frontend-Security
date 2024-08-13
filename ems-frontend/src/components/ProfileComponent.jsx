import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

const ProfileComponent = ({ onClose }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const empId = localStorage.getItem('EmpId'); // Assuming empId is stored in localStorage
            console.log("Fetching profile data for empId:", empId); // Debugging log
            try {
                const response = await axiosInstance.get(`/employees/getById/${empId}`);
                console.log("Profile data fetched:", response.data); // Debugging log
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const popupStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 1003,
        width: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',  // Scroll if content is too long
        fontFamily: 'Arial, sans-serif',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#555',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    };

    const fieldGridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    };

    const fieldStyle = {
        backgroundColor: '#f9f9f9',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const labelStyle = {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
    };

    const valueStyle = {
        color: '#555',
    };

    return (
        <div style={popupStyle}>
            <div style={closeButtonStyle} onClick={onClose}>
                &times;
            </div>
            {profileData ? (
                <div>
                    <h3 style={headerStyle}>Profile Details</h3>
                    <div style={fieldGridStyle}>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Name:</div>
                            <div style={valueStyle}>{profileData.name}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Email:</div>
                            <div style={valueStyle}>{profileData.email}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Mobile No:</div>
                            <div style={valueStyle}>{profileData.mobileNo}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Designation:</div>
                            <div style={valueStyle}>{profileData.designation.designationName}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Department:</div>
                            <div style={valueStyle}>{profileData.department.departmentName}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>User Type:</div>
                            <div style={valueStyle}>{profileData.userType.userType}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Date of Joining:</div>
                            <div style={valueStyle}>{profileData.dateOfJoining}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Date of Birth:</div>
                            <div style={valueStyle}>{profileData.dateOfBirth}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Current Address:</div>
                            <div style={valueStyle}>{profileData.currentAddress}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Permanent Address:</div>
                            <div style={valueStyle}>{profileData.permanentAddress}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>State:</div>
                            <div style={valueStyle}>{profileData.state}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Branch:</div>
                            <div style={valueStyle}>{profileData.branch}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Product:</div>
                            <div style={valueStyle}>{profileData.product}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Manager:</div>
                            <div style={valueStyle}>{profileData.manager}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>HR Manager:</div>
                            <div style={valueStyle}>{profileData.hrManager}</div>
                        </div>
                        <div style={fieldStyle}>
                            <div style={labelStyle}>Payroll Manager:</div>
                            <div style={valueStyle}>{profileData.payrollManager}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfileComponent;

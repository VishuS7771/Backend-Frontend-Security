// src/components/UnauthorizedAccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedAccess = () => {
    return (
        <div>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page. Please <Link to="/login">log in</Link>.</p>
        </div>
    );
};

export default UnauthorizedAccess;

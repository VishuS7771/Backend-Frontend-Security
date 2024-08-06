import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    const [EmpId, setEmpId] = useState(() => {
        return localStorage.getItem('EmpId');
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            const storedEmpId = localStorage.getItem('EmpId');
            setIsAuthenticated(!!token);
            setEmpId(storedEmpId);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token, EmpId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('EmpId', EmpId);
        setIsAuthenticated(true);
        setEmpId(EmpId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('EmpId');
        setIsAuthenticated(false);
        setEmpId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, EmpId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

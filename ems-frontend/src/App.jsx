import './App.css';
import EmployeeComponent from './components/EmployeeComponent';
import EncryptData from './components/EncryptData';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import UnauthorizedAccess from './components/UnauthorizedAccess'; 
import LeftAccordion from './components/LeftAccordion'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AttendanceComponent from './components/AttendanceComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplyLeaveComponent from './components/ApplyLeaveComponent';
import PreviouslyAppliedLeavesComponent from './components/PreviouslyAppliedLeavesComponent';
import ProfileComponent from './components/ProfileComponent';
import LogoutComponent from './components/LogoutComponent';
import SessionTimeout from './components/SessionTimeout';

function App() {
    const contentStyle = {
        paddingTop: '60px',  
        paddingBottom: '60px', 
        marginLeft: '250px' 
    };

    return (
        <AuthProvider>
            <BrowserRouter>
            <SessionTimeout />
                <HeaderComponent />
                <LeftAccordion /> {/* Add LeftAccordion here */}
                  
                <div style={contentStyle}>
                    <Routes>
                        <Route path='/' element={<Navigate to="/login" />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/logout' element={<LogoutComponent />} />
                        <Route path='/register' element={<RegisterComponent />} />
                        <Route 
                            path='/employees' 
                            element={
                                <ProtectedRoute>
                                    <ListEmployeeComponent />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path='/add-employee' 
                            element={
                                <ProtectedRoute>
                                    <EmployeeComponent />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path='/edit-employee/:id' 
                            element={
                                <ProtectedRoute>
                                    <EmployeeComponent />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path='/encrypt' 
                            element={
                                <ProtectedRoute>
                                    <EncryptData />
                                </ProtectedRoute>
                            } 
                        />
                          <Route
                            path='/leave-request'
                            element={
                                <ProtectedRoute>
                                    <ApplyLeaveComponent />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path='/Applied-request'
                            element={
                                <ProtectedRoute>
                                    <PreviouslyAppliedLeavesComponent />
                                </ProtectedRoute>
                            }
                        />
                          <Route
                            path='/Attendance'
                            element={
                                <ProtectedRoute>
                                    <AttendanceComponent />
                                </ProtectedRoute>
                            }
                        />
                          <Route
                            path='/profile'
                            element={
                                <ProtectedRoute>
                                    <ProfileComponent />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='/unauthorized' element={<UnauthorizedAccess />} />
                    </Routes>
                </div>
                <FooterComponent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

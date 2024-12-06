import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestPasswordReset from './pages/ResetPassword';
import VerifyPasswordReset from './pages/VerifyPasswordReset';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import StudentDetail from './pages/StudentDetail';

// Import your home or dashboard page if applicable
// import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<RequestPasswordReset />} />
        <Route path="/verify-reset" element={<VerifyPasswordReset />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;

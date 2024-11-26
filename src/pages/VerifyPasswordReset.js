import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountManagement.css';

const VerifyPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Make POST request to verify password reset API
      const response = await axios.post('http://localhost:3000/api/users/verify-password-reset', {
        email,
        code,
        newPassword,
      });

      const data = response.data;

      // Show success message
      setSuccessMessage(data.message || 'Password reset successful!');

      // Redirect to login page
      setTimeout(() => {
        navigate('/login'); // Replace with your desired path
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    }
  };

  return (
    <div className="login-page">
      <h2>Verify Password Reset</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Reset Code input */}
        <input
          type="text"
          placeholder="Enter reset code"
          className="form-control"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        {/* New Password input */}
        <input
          type="password"
          placeholder="Enter new password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">Submit</button>

        {/* Display error or success messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default VerifyPasswordReset;

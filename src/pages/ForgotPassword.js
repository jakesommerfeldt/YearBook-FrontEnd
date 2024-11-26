import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountManagement.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Make POST request to forgot password API
      const response = await axios.post('http://localhost:3000/api/forgot-password', {
        email,
        oldPassword,
      });

      const data = response.data;

      // Show success message
      setSuccessMessage(data.message);

      // Redirect to Reset Password page
      setTimeout(() => {
        navigate('/reset-password'); // Replace with your desired path
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to validate old password. Please try again.'
      );
    }
  };

  return (
    <div className="login-page">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Old Password input */}
        <input
          type="password"
          placeholder="Enter your old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>

        {/* Display error or success messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;

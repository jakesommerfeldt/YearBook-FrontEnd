import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AccountManagement.css';
import axios from 'axios';

const EmailVerification = () => {
  const [userId, setUserId] = useState(''); // Field for userId
  const [code, setCode] = useState(''); // Field for verification code
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const token = localStorage.getItem('token'); // Retrieve token from localStorage or relevant storage

    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/verify',
        { userId, code }, // Request payload
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      setSuccessMessage(response.data.message || 'Email successfully verified! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard'); // Redirect to the desired route
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Verification failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Verification Code"
          className="form-control"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Verify</button>
        <Link to="/login" className="forgot-password-link">Back to Login</Link>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EmailVerification;

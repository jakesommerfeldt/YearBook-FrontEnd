import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AccountManagement.css';

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

    try {
      const response = await fetch('http://localhost:3000/api/users/verify', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Verification failed. Please try again.');
      }

      const data = await response.json();
      setSuccessMessage(data.message || 'Email successfully verified! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard'); // Change this to the desired route
      }, 2000);
    } catch (error) {
      setError(error.message);
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

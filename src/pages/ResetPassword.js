import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AccountManagement.css';

const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Send request for password reset
      const response = await axios.post('http://localhost:3000/api/users/request-password-reset', {
        email,
      });

      const data = response.data;

      // Show success message
      setSuccessMessage(data.message || 'Password reset link sent successfully!');

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Replace with your desired path
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to send password reset request. Please try again.'
      );
    }
  };

  return (
    <div className="login-page">
      <h2>Request Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">Send Reset Link</button>

        <Link to="/login" className="forgot-password-link">Back to Login</Link>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default RequestPasswordReset;

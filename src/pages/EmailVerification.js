import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './AccountManagement.css';

const EmailVerification = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(''); // To display error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error message
    setError('');

    // Verification logic
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Verification failed. Ensure verification code is entered correctly, or there is an issue with the server.');
      }

      const data = await response.json();

      // Assuming the response includes a token and user info
      // You might want to store the token in localStorage or context
      localStorage.setItem('token', data.token); // Store token for authentication
      localStorage.setItem('user', JSON.stringify(data.user)); // Optionally store user info

      // Navigate to the dashboard or home page after successful login
      navigate('/home'); // Change this to your desired route
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="login-page">
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="code"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default EmailVerification;

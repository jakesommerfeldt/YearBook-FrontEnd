import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import './AccountManagement.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error message
    setError('');

    // Login logic
    try {
      const response = await fetch('http://your-backend-api-url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;

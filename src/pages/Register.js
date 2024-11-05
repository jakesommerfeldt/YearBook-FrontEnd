import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountManagement.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error message
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const response = await fetch('http://your-backend-api-url/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      const data = await response.json();

      // Store user info or token if needed
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to login or home page
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Carroll Email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;

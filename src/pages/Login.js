import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountManagement.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      // Make POST request to login API
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });

      const data = response.data;

      // Store user info or token if login is successful
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to the dashboard or a secure page
      navigate('/dashboard'); // Replace with your desired path
    } catch (error) {
      setError(
        error.response?.data?.message || 'Login failed. Please check your credentials and try again.'
      );
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password input with toggle visibility */}
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="view-password-btn"
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
          >
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

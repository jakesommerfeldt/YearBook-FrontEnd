import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountManagement.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // New fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [quote, setQuote] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [bereal, setBeReal] = useState('');
  const [twitter, setTwitter] = useState('');
  const [tiktok, setTikTok] = useState('');
  const [facebook, setFacebook] = useState('');
  
  const [selectedMajors, setSelectedMajors] = useState([]);
  const majors = [
    'Accounting', 'Actuarial Science', 'Animal Behavior', 'Applied Physics', 'Applied Physics and Engineering Dual Degree', 'Art', 'Athletic Training', 'Aviation Science and Drone Technologies',
    'Biochemistry', 'Biology', 'Business Administration', 'Business Analytics', 'Business Economics', 'Chemistry', 'Communication', 'Computer Science', 'Computer Science and Information Technology',
    'Criminal Justice', 'Educational Studies', 'Elementary Education', 'Engineering and Applied Physics Dual Degree', 'English and Writing', 'Environmental Science', 'Exercise Science', 'Finance',
    'Global Studies', 'Graphic Design', 'Health Sciences', 'Healthcare Administration', 'History', 'Information Technology', 'Management and Leadership', 'Marine Sciences', 'Marketing', 'Mathematics',
    'Music', 'Music Education', 'Music Therapy', 'Musical Theatre', 'Neurodiagnostic Technology', 'Nursing BSN', 'Occupational Therapy MOT', 'Philosophy', 'Photography', 'Physical and Health Education',
    'Physical Therapy Direct Admission Doctor of Physical Therapy', 'Political Science', 'Politics and Economics', 'PreProfessional Health Science Programs', 'PreProfessional Program in Law', 'Psychology',
    'Public Health', 'Religious Studies', 'Secondary Education', 'Sociology', 'Spanish', 'Sports Administration', 'Theatre', 'UndecidedExploring', 'Video Game Design'
  ];

  const [selectedMinors, setSelectedMinors] = useState([]);
  const minors = [
    'Accounting Minor', 'Actuarial Science Minor', 'Animal Behavior Minor', 'Art Minor', 'Artificial Intelligence Minor', 'Arts Management Minor', 'Aviation Science and Unmanned Aircraft Systems UAS Minor',
    'Biochemistry Minor', 'Biology Minor', 'Business Analytics Minor', 'Chemistry Minor', 'Coaching Minor', 'Computer Science Minor', 'Creative Writing Minor',
    'Criminal Justice Minor', 'Earth Science Minor', 'Economics Minor', 'Educational Studies Minor', 'Elementary Education Mathematics Minor', 'English Minor',
    'Environmental Studies Minor', 'Film and Television Minor', 'Finance Minor', 'Global Studies Minor', 'Graphic Design Minor', 'Health and Human Experience Minor',
    'Healthcare Administration Minor', 'History Minor', 'Information Technology Minor', 'Management and Leadership Minor', 'Marketing Minor', 'Mathematics Minor',
    'Elementary Education', 'Medieval and Renaissance Studies Minor', 'Music Minor', 'Musical Theatre Minor', 'Philosophy Minor', 'Photography Minor', 'Physics Minor', 'Political Science Minor',
    'Professional Writing Minor', 'Psychology Minor', 'Public Health Minor', 'Religious Studies Minor', 'Social Media Minor', 'Sociology Minor', 'Sociology of Health Minor',
    'Sociology of Sustainability Minor', 'Spanish Minor', 'Theatre Minor', 'Video Game Studies Minor', 'Women and Gender Studies Minor'
  ];
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message
  
    // Validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (selectedMajors.length < 1) {
      setError('You must select at least one major.');
      return;
    }
    if (selectedMajors.length > 2) {
      setError('You can select up to two majors.');
      return;
    }
    if (selectedMinors.length > 3) {
      setError('You can select up to three minors.');
      return;
    }
  
    try {
      // Prepare FormData payload
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('quote', quote);
      formData.append('graduationYear', graduationYear);
      selectedMajors.forEach((major, index) =>
        formData.append(`majors[${index}]`, major)
      );
      selectedMinors.forEach((minor, index) =>
        formData.append(`minors[${index}]`, minor)
      );
      formData.append('snapchat', snapchat);
      formData.append('bereal', bereal);
      formData.append('twitter', twitter);
      formData.append('tiktok', tiktok);
      formData.append('facebook', facebook);
  
      // Make POST request with form-data
      const response = await axios.post('http://localhost:3000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = response.data;
  
      // Store user info or token if needed
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      // Redirect or handle successful registration
      //navigate('/welcome'); // Replace with your desired path
    } catch (error) {
      setError(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
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

        {/* Confirm Password input with toggle visibility */}
        <div className="password-container">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'} // Toggle between text and password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="view-password-btn"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle visibility
          >
            {confirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>

        <label>Majors (Select 1-2):</label>
        <select
          multiple
          value={selectedMajors}
          onChange={(e) =>
            setSelectedMajors(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {majors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>

        <label>Minors (Select up to 3):</label>
        <select
          multiple
          value={selectedMinors}
          onChange={(e) =>
            setSelectedMinors(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {minors.map((minor, index) => (
            <option key={index} value={minor}>
              {minor}
            </option>
          ))}
        </select>

        <div className="password-container">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          />
        </div>
        
        <input
          type="text"
          placeholder="Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
        <input
          type="number"
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Snapchat (optional)"
          value={snapchat}
          onChange={(e) => setSnapchat(e.target.value)}
        />

      <div className="password-container">
        <input
          type="text"
          placeholder="BeReal (optional)"
          value={bereal}
          onChange={(e) => setBeReal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Twitter (optional)"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>

      <div className="password-container">
        <input
          type="text"
          placeholder="TikTok (optional)"
          value={tiktok}
          onChange={(e) => setTikTok(e.target.value)}
        />
        <input
          type="text"
          placeholder="Facebook (optional)"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </div>

        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}

      </form>
    </div>
  );

};

export default Register;

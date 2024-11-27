import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import './AccountManagement.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [major1ID, setMajor1ID] = useState('');
  const [major2ID, setMajor2ID] = useState('');
  const [minor1ID, setMinor1ID] = useState('');
  const [minor2ID, setMinor2ID] = useState('');
  const [minor3ID, setMinor3ID] = useState('');
  const [quote, setQuote] = useState('');
  const [finishYear, setFinishYear] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  const [selectedMajors, setSelectedMajors] = useState([]);
  const majors = [
    { id: 1, name: "Accounting" },
    { id: 2, name: "Actuarial Science" },
    { id: 3, name: "Animal Behavior" },
    { id: 4, name: "Applied Physics" },
    { id: 5, name: "Applied Physics and Engineering Dual Degree" },
    { id: 6, name: "Art" },
    { id: 7, name: "Athletic Training" },
    { id: 8, name: "Aviation Science and Drone Technologies" },
    { id: 9, name: "Biochemistry" },
    { id: 10, name: "Biology" },
    { id: 11, name: "Business Administration" },
    { id: 12, name: "Business Analytics" },
    { id: 13, name: "Business Economics" },
    { id: 14, name: "Chemistry" },
    { id: 15, name: "Communication" },
    { id: 16, name: "Computer Science" },
    { id: 17, name: "Computer Science and Information Technology" },
    { id: 18, name: "Criminal Justice" },
    { id: 19, name: "Educational Studies" },
    { id: 20, name: "Elementary Education" },
    { id: 21, name: "English and Writing" },
    { id: 22, name: "Engineering and Applied Physics Dual Degree" },
    { id: 23, name: "Environmental Science" },
    { id: 24, name: "Exercise Science" },
    { id: 25, name: "Finance" },
    { id: 26, name: "Global Studies" },
    { id: 27, name: "Graphic Design" },
    { id: 28, name: "Healthcare Administration" },
    { id: 29, name: "Health Sciences" },
    { id: 30, name: "History" },
    { id: 31, name: "Information Technology" },
    { id: 32, name: "Management and Leadership" },
    { id: 33, name: "Marine Sciences" },
    { id: 34, name: "Marketing" },
    { id: 35, name: "Mathematics" },
    { id: 36, name: "Music" },
    { id: 37, name: "Music Education" },
    { id: 38, name: "Musical Theatre" },
    { id: 39, name: "Music Therapy" },
    { id: 40, name: "Neurodiagnostic Technology" },
    { id: 41, name: "Nursing (BSN)" },
    { id: 42, name: "Occupational Therapy (MOT)" },
    { id: 43, name: "Philosophy" },
    { id: 44, name: "Politics and Economics" },
    { id: 45, name: "Photography" },
    { id: 46, name: "Physical and Health Education" },
    { id: 47, name: "Physical Therapy (Direct Admission – Doctor of Physical Therapy)" },
    { id: 48, name: "Political Science" },
    { id: 49, name: "Pre-Professional Program in Law" },
    { id: 50, name: "Pre-Professional Health Science Programs" },
    { id: 51, name: "Psychology" },
    { id: 52, name: "Public Health" },
    { id: 53, name: "Religious Studies" },
    { id: 54, name: "Secondary Education" },
    { id: 55, name: "Sociology" },
    { id: 56, name: "Spanish" },
    { id: 57, name: "Sports Administration" },
    { id: 58, name: "Theatre" },
    { id: 59, name: "Undecided/Exploring" },
    { id: 60, name: "Video Game Design" },
  ];

  const [selectedMinors, setSelectedMinors] = useState([]);
  const minors = [
    { id: 1, name: "Accounting Minor" },
    { id: 2, name: "Actuarial Science Minor" },
    { id: 3, name: "Animal Behavior Minor" },
    { id: 4, name: "Art Minor" },
    { id: 5, name: "Artificial Intelligence Minor" },
    { id: 6, name: "Arts Management Minor" },
    { id: 7, name: "Aviation Science and Unmanned Aircraft Systems (UAS) Minor" },
    { id: 8, name: "Biochemistry Minor" },
    { id: 9, name: "Biology Minor" },
    { id: 10, name: "Business Analytics Minor" },
    { id: 11, name: "Chemistry Minor" },
    { id: 12, name: "Coaching Minor" },
    { id: 13, name: "Computer Science Minor" },
    { id: 14, name: "Creative Writing Minor" },
    { id: 15, name: "Criminal Justice Minor" },
    { id: 16, name: "Earth Science Minor" },
    { id: 17, name: "Economics Minor" },
    { id: 18, name: "Educational Studies Minor" },
    { id: 19, name: "Elementary Education Mathematics Minor" },
    { id: 20, name: "English Minor" },
    { id: 21, name: "Environmental Studies Minor" },
    { id: 22, name: "Film and Television Minor" },
    { id: 23, name: "Finance Minor" },
    { id: 24, name: "Global Studies Minor" },
    { id: 25, name: "Graphic Design Minor" },
    { id: 26, name: "Health and Human Experience Minor" },
    { id: 27, name: "Healthcare Administration Minor" },
    { id: 28, name: "History Minor" },
    { id: 29, name: "Information Technology Minor" },
    { id: 30, name: "Management and Leadership Minor" },
    { id: 31, name: "Marketing Minor" },
    { id: 32, name: "Mathematics Minor" },
    { id: 33, name: "Mathematics Minor, Elementary Education" },
    { id: 34, name: "Medieval and Renaissance Studies Minor" },
    { id: 35, name: "Music Minor" },
    { id: 36, name: "Musical Theatre Minor" },
    { id: 37, name: "Philosophy Minor" },
    { id: 38, name: "Photography Minor" },
    { id: 39, name: "Physics Minor" },
    { id: 40, name: "Political Science Minor" },
    { id: 41, name: "Professional Writing Minor" },
    { id: 42, name: "Psychology Minor" },
    { id: 43, name: "Public Health Minor" },
    { id: 44, name: "Religious Studies Minor" },
    { id: 45, name: "Sociology Minor" },
    { id: 46, name: "Sociology of Health Minor" },
    { id: 47, name: "Social Media Minor" },
    { id: 48, name: "Sociology of Sustainability Minor" },
    { id: 49, name: "Spanish Minor" },
    { id: 50, name: "Theatre Minor" },
    { id: 51, name: "Video Game Studies Minor" },
    { id: 52, name: "Women and Gender Studies Minor" },
  ];
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    // Validation
    if (!major1ID) {
      setError('You must select a primary major.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('accessLevel', 1);
      formData.append('major1ID', major1ID);
      if (major2ID) formData.append('major2ID', major2ID);
      if (minor1ID) formData.append('minor1ID', minor1ID);
      if (minor2ID) formData.append('minor2ID', minor2ID);
      if (minor3ID) formData.append('minor3ID', minor3ID);
      formData.append('quote', quote);
      formData.append('finishYear', finishYear);
      if (profileImage) formData.append('profileImage', profileImage);

      const response = await axios.post('http://localhost:3000/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Store user info or token if needed
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect or handle successful registration
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="major1">Major 1:</label>
        <select
          id="major1"
          className="form-control"
          value={major1ID}
          onChange={(e) => setMajor1ID(e.target.value)}
          required
        >
          <option value="">Select Major</option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="major2">Major 2 (Optional):</label>
        <select
          id="major2"
          className="form-control"
          value={major2ID}
          onChange={(e) => setMajor2ID(e.target.value)}
        >
          <option value="">Select Major</option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="minor1">Minor 1:</label>
        <select
          id="minor1"
          className="form-control"
          value={minor1ID}
          onChange={(e) => setMinor1ID(e.target.value)}
        >
          <option value="">Select Minor</option>
          {minors.map((minor) => (
            <option key={minor.id} value={minor.id}>
              {minor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="minor2">Minor 2:</label>
        <select
          id="minor2"
          className="form-control"
          value={minor2ID}
          onChange={(e) => setMinor2ID(e.target.value)}
        >
          <option value="">Select Minor</option>
          {minors.map((minor) => (
            <option key={minor.id} value={minor.id}>
              {minor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="minor3">Minor 3:</label>
        <select
          id="minor3"
          className="form-control"
          value={minor3ID}
          onChange={(e) => setMinor3ID(e.target.value)}
        >
          <option value="">Select Minor</option>
          {minors.map((minor) => (
            <option key={minor.id} value={minor.id}>
              {minor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Finish Year"
          className="form-control"
          value={finishYear}
          onChange={(e) => setFinishYear(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={(e) => setProfileImage(e.target.files[0])}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Quote"
          className="form-control"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
      {error && <p className="error-message">{error}</p>}

      <Link to="/login">Have an account? Login</Link>

    </form>
    
  </div>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import './AccountManagement.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const API_BASE = 'http://localhost:3000/api/users'; 

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState({
        name: '',
        email: '',
        password: '',
        accessLevel: '',
        major1ID: '',
        major2ID: '',
        minor1ID: '',
        minor2ID: '',
        minor3ID: '',
        quote: '',
        year: '',
        finishYear: '',
        instagramUsername: '',
        snapchatUsername: '',
        beRealUsername: '',
        twitterUsername: '',
        tikTokUsername: '',
        facebookUsername: '',
    });
    
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
    
    const [showAllUsers, setShowAllUsers] = useState(true); // To toggle All Users section
    const [showUpdateUser, setShowUpdateUser] = useState(false); // To toggle Update User section
    const [isDeleteSectionVisible, setDeleteSectionVisible] = useState(false);

    const navigate = useNavigate(); // For navigation

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_BASE, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const updateUser = async (userId, updateData) => {
        try {
            // Make a PUT request to the server to update user data
            const response = await axios.put(
                `http://localhost:3000/api/users/${userId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in request headers
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Log the success response and return the data
            console.log('Update successful:', response.data);
            return response.data;
        } catch (error) {
            // Check if the error has a response (server responded with a status)
            if (error.response) {
                const { status, data } = error.response;
    
                // Log detailed error info
                console.error('Error Status:', status);
                console.error('Error Data:', data);
    
                // User feedback based on status
                if (status === 401) {
                    alert('Unauthorized. Please log in again.');
                } else if (status === 403) {
                    alert('Forbidden. You do not have permission to update this user.');
                } else if (status === 404) {
                    alert('User not found. Please check the user ID.');
                } else if (status === 500) {
                    alert('Server error. Please try again later.');
                } else {
                    alert(`Unexpected error: ${data?.error || 'Unknown error occurred'}`);
                }
            } else if (error.request) {
                // No response received from server
                console.error('No response received:', error.request);
                alert('No response from server. Please check your connection.');
            } else {
                // Error occurred while setting up the request
                console.error('Request Setup Error:', error.message);
                alert(`Error occurred: ${error.message}`);
            }
        }
    };
        
    //      TOGGLE FUNCTIONALITY
    const toggleAllUsers = () => {
        setShowAllUsers((prev) => !prev);
    };
    
    const toggleUpdateUser = () => {
        setShowUpdateUser((prev) => !prev);
    };
    
    const toggleDeleteSection = () => {
        setDeleteSectionVisible(!isDeleteSectionVisible);
    };
    
    // Delete authenticated user account
    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userID;

        try {
            const response = await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.message); // Log success message
            alert('Account deleted successfully!');
            navigate('/login');
        } catch (error) {
          console.error('Error deleting account:', error.response?.data || error.message);
          alert('Failed to delete account. Please try again.');
        }
    };
      
    // Refresh users list
    const refreshUsers = async () => {
        try {
            const response = await fetch(API_BASE, {
                headers: { Authorization: 'Bearer YOUR_TOKEN' },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error refreshing users:', error);
        }
    };

    // Handle sign out
    const handleSignOut = () => {
        // Clear authentication tokens or session data
        localStorage.removeItem('authToken');
        navigate('/login'); // Redirect to login page
    };

    //      major and minor display
    const getMajorNameById = (id) => {
        const major = majors.find((major) => major.id === id);
        return major ? major.name : "";
    };
    
    const getMinorNameById = (id) => {
        const minor = minors.find((minor) => minor.id === id);
        return minor ? minor.name : "";
    };
    
    const formatLabel = (field) => {
    return field
        .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

    return (
        <div className="dashboard-container">
            <div className="header-container">
                <h1>Dashboard</h1>
                <button className="sign-out" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
    
            <h3>Toggle Views</h3>
            <div className="button-container">
                {/* Toggle Views */}
                <div className="section-toggle-buttons">
                    <button onClick={toggleAllUsers}>
                        {showAllUsers ? 'Hide All Users' : 'Show All Users'}
                    </button>
                    <button onClick={toggleUpdateUser}>
                        {showUpdateUser ? 'Hide Update User' : 'Show Update User'}
                    </button>
                    <button onClick={toggleDeleteSection}>
                        {isDeleteSectionVisible ? 'Hide Delete Account Section' : 'Show Delete Account Section'}
                    </button>
                </div>
            </div>
    
            {showAllUsers && (
                <div id="user-table-section">
                    <h3>All Users</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Maj 1</th>
                                    <th>Maj 2</th>
                                    <th>Min 1</th>
                                    <th>Min 2</th>
                                    <th>Min 3</th>
                                    <th>BeReal Username</th>
                                    <th>Facebook Username</th>
                                    <th>Instagram Username</th>
                                    <th>Snapchat Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.name}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{getMajorNameById(user.major1ID)}</td>
                                        <td>{getMajorNameById(user.major2ID)}</td>
                                        <td>{getMinorNameById(user.minor1ID)}</td>
                                        <td>{getMinorNameById(user.minor2ID)}</td>
                                        <td>{getMinorNameById(user.minor3ID)}</td>
                                        <td>{user.beRealUsername}</td>
                                        <td>{user.facebookUsername}</td>
                                        <td>{user.instagramUsername}</td>
                                        <td>{user.snapchatUsername}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
    
            {showUpdateUser && (
                <div className="update-user-section">
                    <h2>Update User</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // Handle form submission if necessary
                        }}
                    >
                        {[
                            'name',
                            'major1ID',
                            'major2ID',
                            'minor1ID',
                            'minor2ID',
                            'minor3ID',
                            'quote',
                            'year',
                            'finishYear',
                            'instagramUsername',
                            'snapchatUsername',
                            'beRealUsername',
                            'twitterUsername',
                            'tikTokUsername',
                            'facebookUsername'
                        ].map((field) => (
                            <div key={field} className="form-group">
                                <label htmlFor={field}>{field}</label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    onChange={(e) => {
                                        setUpdateData((prevData) => ({
                                            ...prevData,
                                            [field]: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        ))}
                    </form>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                                const decodedToken = jwtDecode(token);

                                const result = await updateUser(decodedToken.userID, updateData);
                                console.log('Update successful:', result);
                                // Optionally, show a success message or update UI state
                            } catch (err) {
                                console.error('Failed to update user:', err);
                                // Optionally, show an error message
                            }
                        }}
                    >
                        Update User
                    </button>
                </div>
            )}

            {isDeleteSectionVisible && (
                <div className="delete-account-section">
                    <h3>Delete Account</h3>
                    <p>
                        Warning: Deleting your account is irreversible.
                    </p>
                    <button className="delete-button" onClick={handleDeleteAccount}>
                        Delete My Account
                    </button>
                </div>
            )}            
        </div>
    );
};

export default Dashboard;

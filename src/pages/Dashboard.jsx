import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you're using React Router
import './AccountManagement.css';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/users'; // Replace with your API endpoint

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState({ id: '', name: '', email: '' });

    const [showAllUsers, setShowAllUsers] = useState(true); // To toggle All Users section
    const [showUpdateUser, setShowUpdateUser] = useState(false); // To toggle Update User section

    const navigate = useNavigate(); // For navigation

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_BASE, {
                    headers: { Authorization: 'Bearer YOUR_TOKEN' },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle update form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    // Update user by ID
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const { id, name, email } = updateData;
            await fetch(`${API_BASE}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN',
                },
                body: JSON.stringify({ name, email }),
            });
            alert('User updated successfully');
            setUpdateData({ id: '', name: '', email: '' });
            refreshUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Delete user by ID
    const handleDeleteUser = async (id) => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in.');
            }
    
            // Make the DELETE request with the token in the Authorization header
            const response = await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // Optional, in case the server requires it
                },
            });
    
            // Check if the request was successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user');
            }
    
            alert('User deleted successfully');
            refreshUsers(); // Refresh the list of users after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error deleting user: ${error.message}`);
        }
    };
    
    const toggleAllUsers = () => {
        setShowAllUsers((prev) => !prev);
    };
    
    const toggleUpdateUser = () => {
        setShowUpdateUser((prev) => !prev);
    };
    

    // Delete authenticated user account
    const handleDeleteAccount = async () => {
        const userId = "3"; // Replace with logic to get the logged-in user's ID (e.g., from state or context)
        const token = localStorage.getItem('token'); // Replace with the correct way to retrieve the token in your app
      
        try {
          const response = await axios.delete(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.message); // Show success message to the user
          alert('Account deleted successfully.');
          // Redirect the user or clean up frontend state as necessary
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
                </div>
            </div>
    
            {showAllUsers && (
                <div id="user-table-section">
                    <h3>All Users</h3>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userID}>
                                    <td>{user.userID}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user.userID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
    
            {showUpdateUser && (
                <div className="form-container">
                    <h3>Update User</h3>
                    <form onSubmit={handleUpdateUser}>
                        <input
                            type="text"
                            name="id"
                            placeholder="User ID"
                            value={updateData.id}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={updateData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={updateData.email}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Update User</button>
                    </form>
                </div>
            )}

            <div className="form-container">
                <h3>Delete Account</h3>
                <button className="delete-button" onClick={handleDeleteAccount}>
                    Delete My Account
                </button>
            </div>
            
        </div>
    );
};

export default Dashboard;

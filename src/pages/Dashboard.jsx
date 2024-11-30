import React, { useEffect, useState } from 'react';
import './AccountManagement.css';

const API_BASE = 'http://localhost:3001/users'; // Replace with your API endpoint

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [updateData, setUpdateData] = useState({ id: '', name: '', email: '' });

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
            await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer YOUR_TOKEN' },
            });
            alert('User deleted successfully');
            refreshUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Delete authenticated user account
    const handleDeleteAccount = async () => {
        const userId = prompt('Enter your user ID to confirm deletion:');
        if (userId) {
            try {
                await fetch(`${API_BASE}/${userId}`, {
                    method: 'DELETE',
                    headers: { Authorization: 'Bearer YOUR_TOKEN' },
                });
                alert('Account deleted successfully');
                window.location.reload();
            } catch (error) {
                console.error('Error deleting account:', error);
            }
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

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>

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

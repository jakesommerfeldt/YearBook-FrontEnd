// src/pages/StudentDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/users';

const StudentDetail = () => {
    const { id } = useParams(); // Extract student ID from the route
    const [student, setStudent] = useState(null); // State to hold student data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true);
    
                // Retrieve the token (ensure it's stored during login)
                const token = localStorage.getItem('token'); // Example: adjust to your app's token storage
                if (!token) {
                    throw new Error('Authentication token not found.');
                }
    
                // Include the token in the headers
                const response = await axios.get(`${API_BASE}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace with your API's required header format
                    },
                });
    
                setStudent(response.data); // Update state with fetched data
            } catch (err) {
                console.error('Error fetching student details:', err.message); // Log error details
                setError(err.message.includes('401') ? 'Unauthorized: Please log in.' : 'Failed to load student details.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchStudent();
    }, [id]);
    
    if (loading) return <div>Loading...</div>; // Show while loading
    if (error) return <div>{error}</div>; // Show if error occurs
    if (!student) return <div>No student data found.</div>; // Show if no data

    // Render the student's details
    return (
        <div className="dashboard-container-with-bg">
            <div className="header-container">
                <h1>Student Details</h1>
                <button className="sign-out" onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>
            <div className="update-user-section">
                <h1>Student Details</h1>
                <p><strong>Email:</strong> {student.email || 'N/A'}</p>
                <p><strong>Major 1:</strong> {student.major1?.name || 'N/A'}</p>
                <p><strong>Major 2:</strong> {student.major2?.name || 'N/A'}</p>
                <p><strong>Minor 1:</strong> {student.minor1?.name || 'N/A'}</p>
                <p><strong>Minor 2:</strong> {student.minor2?.name || 'N/A'}</p>
                <p><strong>Minor 3:</strong> {student.minor3?.name || 'N/A'}</p>
                <p><strong>BeReal Username:</strong> {student.beRealUsername || 'N/A'}</p>
                <p><strong>Facebook Username:</strong> {student.facebookUsername || 'N/A'}</p>
                <p><strong>Instagram Username:</strong> {student.instagramUsername || 'N/A'}</p>
                <p><strong>Snapchat Username:</strong> {student.snapchatUsername || 'N/A'}</p>
            </div>
        </div>
    );
};

export default StudentDetail;

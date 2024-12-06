// StudentDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/users';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Fetch student details from API
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`${API_BASE}/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudent();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{student.name}'s Details</h1>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Major:</strong> {student.major}</p>
            <p><strong>Quote:</strong> {student.quote}</p>
            {/* Add other fields as needed */}
        </div>
    );
};

export default StudentDetail;

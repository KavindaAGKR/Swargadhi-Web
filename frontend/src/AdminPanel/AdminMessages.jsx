import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminMessages = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/feedback/get'); // Adjust the URL as needed
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div>
            <h1>Admin Messages</h1>
            <table>
                <thead>
                    <tr>
                        <th>Feedback</th>
                        <th>Given By</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td>{feedback.feedBack}</td>
                            <td>{feedback.givenBy ? `${feedback.givenBy.firstName} ${feedback.givenBy.lastName}` : 'Unknown'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

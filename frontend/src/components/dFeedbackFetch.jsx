import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationNavbar from '../components/DonationNavbar';

function DFeedbackFetch() {
    const [dfeedback, setDFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = () => {
        axios.get("http://localhost:4000/dFeedback/getAllf")
            .then((res) => {
                console.log(res);
                setDFeedback(res.data); // Assuming res.data contains the feedback data
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDeleteFeedback = (id) => {
        axios.delete(`http://localhost:4000/dFeedback/delete/${id}`)
            .then((res) => {
                console.log("Feedback deleted successfully:", id);
                // Update the feedback list after deletion
                setDFeedback(dfeedback.filter(feedbackItem => feedbackItem._id !== id));
            })
            .catch((err) => {
                console.error("Error deleting feedback:", err);
            });
    };

    return (
        <DonationNavbar>
        <div>
            <h1>All Feedback</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dfeedback.map((feedbackItem, index) => (
                        <tr key={index}>
                            <td>{feedbackItem.name}</td>
                            <td>{feedbackItem.phone}</td>
                            <td>{feedbackItem.message}</td>
                            <td>
                                <button onClick={() => handleDeleteFeedback(feedbackItem._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DonationNavbar>
    );
}

export default DFeedbackFetch;

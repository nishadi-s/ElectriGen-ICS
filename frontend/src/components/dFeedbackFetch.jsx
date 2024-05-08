import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonationNavbar from '../components/DonationNavbar';
import Button from 'react-bootstrap/Button';
import "../donation.css";
import Swal from 'sweetalert2';

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
        // Display confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            // If user confirms deletion
            if (result.isConfirmed) {
                // Send delete request to backend
                axios.delete(`http://localhost:4000/dFeedback/delete/${id}`)
                    .then((res) => {
                        console.log("Feedback deleted successfully:", id);
                        // Update the feedback list after deletion
                        setDFeedback(dfeedback.filter(feedbackItem => feedbackItem._id !== id));
                        // Show success message
                        Swal.fire("Deleted!", "Your feedback has been deleted.", "success");
                    })
                    .catch((err) => {
                        console.error("Error deleting feedback:", err);
                        // Show error message
                        Swal.fire("Error", "Failed to delete feedback. Please try again later.", "error");
                    });
            }
        });
    };

    return (
        <DonationNavbar>
            <div>
                <h1 className="don-header">All Feedback</h1>
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
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}>
                                <td>{feedbackItem.name}</td>
                                <td>{feedbackItem.phone}</td>
                                <td>{feedbackItem.message}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteFeedback(feedbackItem._id)}>Delete</Button>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DFeedbackFetch() {
    const [dfeedback, setDFeedback] = useState([]);

    useEffect(() => {
        function getDFeedback() {
            axios.get("http://localhost:4000/dFeedback/getAllf")
                .then((res) => {
                    console.log(res);
                    setDFeedback(res.data); // Assuming res.data contains the feedback data
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        getDFeedback();

    }, []);

    return (
        <div>
            <h1>All Feedback</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {dfeedback.map((feedbackItem, index) => (
                        <tr key={index}>
                            <td>{feedbackItem.name}</td>
                            <td>{feedbackItem.phone}</td>
                            <td>{feedbackItem.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DFeedbackFetch;

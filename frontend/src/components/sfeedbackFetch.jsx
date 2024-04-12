import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const SfeedbackFetch = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/sfeedback/getAllf')
      .then(res => {
        setFeedbacks(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.phone}</td>
              <td>{feedback.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SfeedbackFetch;

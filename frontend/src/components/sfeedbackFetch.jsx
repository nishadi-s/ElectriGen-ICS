import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert

const SfeedbackFetch = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sfeedback/getAllf');
      setFeedbacks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Show confirmation alert before deleting
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:4000/sfeedback/dsf/${id}`);
          // Remove the deleted feedback from the state
          setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
          Swal.fire("Deleted!", "The feedback has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.phone}</td>
              <td>{feedback.message}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(feedback._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SfeedbackFetch;

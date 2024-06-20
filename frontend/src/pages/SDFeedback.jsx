import React from "react";
import { Link } from 'react-router-dom';
import SfeedbackFetch from "../components/sfeedbackFetch";
import SalesNavbar from "../components/SalesNavbar";
import "../sales.css";

const SDFeedback = () => {
  return (
    <SalesNavbar>
    <div>
      <h1 className="sales-header">Important Customer Feedbacks</h1>
      <div class="mt-5 mb-5">
        <SfeedbackFetch />
      </div>

      <Link to="/salesFeedback">
        <button type="button" className="btn btn-primary">Add Feedback</button>
      </Link>
    </div>
    </SalesNavbar>
  );
};

export default SDFeedback;
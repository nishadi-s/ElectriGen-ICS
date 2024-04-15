import React from "react";
import { Link } from 'react-router-dom';
import SfeedbackFetch from "../components/sfeedbackFetch";
import SalesNavbar from "../components/SalesNavbar";

const SDFeedback = () => {
  return (
    <SalesNavbar>
    <div>
      <h1>Important Customer Feedbacks</h1>
      <div>
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
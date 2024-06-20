import React, { useState } from "react";
import { Link } from 'react-router-dom';
import SfeedbackFetch from "../components/sfeedbackFetch";
import PinVerification from "../components/PinVerification";
import InvoiceReport from "./InvoiceReport";

const Dashboard = () => {
  const correctPin = '1234'; // Your correct PIN number
  const targetPage = '/viewInvoice'; // URL of the target page

  const [showPinVerification, setShowPinVerification] = useState(false);

  const handleButtonClick = () => {
    // Show the PIN verification dialog
    setShowPinVerification(true);
  };

  const handlePinVerificationClose = () => {
    // Hide the PIN verification dialog
    setShowPinVerification(false);
  };

  return (
    <div>
      <h1>Dashboard page</h1>

      <div>
        <h2>Invoice Records</h2>
      </div>

      <table>
        <tr>
          <td style={{ padding: '10px' }}>
            <Link to="/invoiceCreate">
              <button type="button" className="btn btn-primary btn-lg mr-4 fs-lg">Create Invoice</button>
            </Link>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '10px' }}>
            <Link to="/viewInvoice">
              <button type="button" className="btn btn-primary btn-lg mr-4 fs-lg">View Invoices</button>
            </Link>
          </td>
        </tr>
      </table>

      <div>
        {showPinVerification && (
          <PinVerification
            correctPin={correctPin}
            targetPage={targetPage}
            onClose={handlePinVerificationClose}
          />
        )}
      </div>

      <div>
        <button onClick={handleButtonClick} className="btn btn-primary btn-lg mr-4 fs-lg">Enter Secure Area</button>
      </div><br/>

      <div>
        <Link to="/InvoiceReport">
            <button type="button" className="btn btn-primary btn-lg mr-4 fs-lg">Sales Report</button>
         </Link>
      </div>

      <div>
        <h2>Customer Feedbacks regarding Sales</h2>
      </div>

      <div>
        <SfeedbackFetch />
      </div>

      <Link to="/salesFeedback">
        <button type="button" className="btn btn-primary">Add Feedback</button>
      </Link>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SfeedbackFetch from "../components/sfeedbackFetch";
import PinVerification from "../components/PinVerification";
import { useAuthStore } from "../store/useAuthStore";
import { USER_ROLES } from "../constants/roles";

const Dashboard = () => {
  const navigate = useNavigate();
  //
  const { isAuthenticated, logout, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
    user: state.user,
  }));
  //
  const correctPin = "1234"; // Your correct PIN number
  const targetPage = "/viewInvoice"; // URL of the target page

  const [showPinVerification, setShowPinVerification] = useState(false);

  const handleButtonClick = () => {
    // Show the PIN verification dialog
    setShowPinVerification(true);
  };

  const handlePinVerificationClose = () => {
    // Hide the PIN verification dialog
    setShowPinVerification(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard page</h1>

      {user && (
        <div className="alert alert-primary" role="alert">
          You are logged in as <strong>{USER_ROLES[user.role]}</strong>
        </div>
      )}

      {!isAuthenticated ? (
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      ) : (
        <>
          <Link to="/profile" className="btn btn-primary">
            Profile
          </Link>
          <button onClick={handleLogout} className="btn btn-danger mx-2">
            Logout
          </button>
        </>
      )}

      <div>
        <h2>Invoice Records</h2>
      </div>

      <table>
        <tr>
          <td style={{ padding: "10px" }}>
            <Link to="/invoiceCreate">
              <button
                type="button"
                className="btn btn-primary btn-lg mr-4 fs-lg"
              >
                Create Invoice
              </button>
            </Link>
          </td>
        </tr>
        <tr>
          <td style={{ padding: "10px" }}>
            <Link to="/viewInvoice">
              <button
                type="button"
                className="btn btn-primary btn-lg mr-4 fs-lg"
              >
                View Invoices
              </button>
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
        <button onClick={handleButtonClick} className="btn btn-primary">
          Enter Secure Area
        </button>
      </div>

      <div>
        <h2>Customer Feedbacks regarding Sales</h2>
      </div>

      <div>
        <SfeedbackFetch />
      </div>

      <Link to="/salesFeedback">
        <button type="button" className="btn btn-primary">
          Add Feedback
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;

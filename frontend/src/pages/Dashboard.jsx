import React from "react";
import { Link } from 'react-router-dom';
import SfeedbackFetch from "../components/sfeedbackFetch";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard page</h1>

      <div>
        <h2>Invoice Records</h2>
      </div>

      

      <div>
      <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Bill ID</th>
              <th scope="col">Date</th>
              <th scope="col">Total Qty.</th>
              <th scope="col">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
      </table>
      </div>

      <Link to="/invoiceCreate">
        <button type="button" className="btn btn-primary mr-4">Create Invoice</button>
      </Link>

      <Link to="/viewInvoice">
        <button type="button" className="btn btn-primary mr-4">View Invoices</button>
      </Link>


      <div>
        <h2>Customer Feedbacks regarding Sales</h2>
      </div>

      <div>
        <SfeedbackFetch />
      </div>

      

      <Link to="/salesFeedback">
        <button type="button" class="btn btn-primary">Add Feedback</button>
      </Link>





    </div>

  );
};

export default Dashboard;

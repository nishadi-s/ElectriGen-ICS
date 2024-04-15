import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import SalesNavbar from '../components/SalesNavbar';
import axios from 'axios';
import PinVerification from "../components/PinVerification";

const SDView = () => {
  const correctPin = '1234'; // Your correct PIN number
  const targetPage = '/viewInvoice'; // URL of the target page

  const [data, setData] = useState([]);
  const [showPinVerification, setShowPinVerification] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sales/display');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleButtonClick = () => {
    // Show the PIN verification dialog
    setShowPinVerification(true);
  };

  const handlePinVerificationClose = () => {
    // Hide the PIN verification dialog
    setShowPinVerification(false);
  };

  return (
    <SalesNavbar>
      <div>
        <h1>Sales Records</h1>
        <Button onClick={handleButtonClick} className="btn btn-primary mb-3">Verify PIN</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Date</th>
              <th>Item No.</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              item.items.map((subItem, index) => (
                <tr key={`${item.billID}-${index}`} className={index === 0 ? 'border-bottom' : ''}>
                  {index === 0 ? <td rowSpan={item.items.length}>{item.billID}</td> : null}
                  {index === 0 ? <td rowSpan={item.items.length}>{new Date(item.bdate).toLocaleDateString()}</td> : null}
                  <td>{subItem.ino}</td>
                  <td>{subItem.desc}</td>
                  <td>{subItem.qty}</td>
                  <td>{subItem.price}</td>
                  <td>{subItem.iamount}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
        {showPinVerification && (
          <PinVerification
            correctPin={correctPin}
            targetPage={targetPage}
            onClose={handlePinVerificationClose}
          />
        )}
      </div>
    </SalesNavbar>
  );
};

export default SDView;

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SalesNavbar from '../components/SalesNavbar';

const InvoiceUpdate = () => {
  const { billID } = useParams(); // Fetching billID from URL params
  const [invoiceData, setInvoiceData] = useState({
    bdate: '',
    items: [{ ino: '', desc: '', qty: 0, price: 0, iamount: 0 }],
    tot: 0,
    totqty: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/sales/get/${billID}`);
        const data = response.data.data; // Extract 'data' object from the API response

        // Ensure that all fields are present in the fetched data
        if (data && data.billID && data.bdate && data.items && data.tot && data.totqty) {
          setInvoiceData(data);
        } else {
          console.error('Incomplete data received from the API:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [billID]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...invoiceData.items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };

    let totalAmount = 0;
    let totalQuantity = 0;

    updatedItems.forEach((item) => {
      const amount = parseFloat(item.qty) * parseFloat(item.price); // Calculate amount based on quantity and unit price
      item.iamount = amount.toFixed(2); // Update the calculated amount for the item
      totalAmount += amount;
      totalQuantity += parseFloat(item.qty);
    });

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      tot: totalAmount.toFixed(2),
      totqty: totalQuantity.toFixed(2),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/sales/update/${billID}`, invoiceData); // Sending updated data to API
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Submitted!",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        window.location.replace('/viewInvoice'); // Redirect to the viewInvoice component
      }, 1500);

    } catch (error) {
      console.error('Error updating invoice:', error);
      
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error in Submitting!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <SalesNavbar>
    <div>
      <h1>Edit Invoice</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBillID">
            <Form.Label>Bill ID</Form.Label>
            <Form.Control type="text" name="billID" value={billID || ''} readOnly />
          </Form.Group>

          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" name="bdate" value={new Date(invoiceData.bdate).toLocaleDateString()} readOnly />
          </Form.Group>
        </Row>

        <table>
          <thead>
            <tr>
              <th>Item No.</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th> {/* New column for unit price */}
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items && invoiceData.items.length > 0 ? (
              invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      name="ino"
                      value={item.ino || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="desc"
                      value={item.desc || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="qty"
                      value={item.qty || 0} // Use default value 0 for qty
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="price"
                      value={item.price || 0} // Use default value 0 for price
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="iamount"
                      value={item.iamount || 0} // Use default value 0 for iamount
                      readOnly
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items found</td>
              </tr>
            )}
          </tbody>
        </table>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTotalAmount">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" name="tot" value={invoiceData.tot || 0} readOnly />
          </Form.Group>

          <Form.Group as={Col} controlId="formTotalQuantity">
            <Form.Label>Total Quantity</Form.Label>
            <Form.Control type="text" name="totqty" value={invoiceData.totqty || 0} readOnly />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    </SalesNavbar>
  );
};

export default InvoiceUpdate;

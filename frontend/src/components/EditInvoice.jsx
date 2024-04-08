import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const EditInvoice = () => {
  const { billID } = useParams(); // Use useParams to get billID
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/sales/${billID}`); // Use billID from useParams
        setInvoice(response.data);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [billID]); // Include billID in the dependency array

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedInvoice = { ...invoice, items };
      await axios.put(`http://localhost:4000/sales/update/${billID}`, updatedInvoice); // Use billID from useParams
      alert('Invoice updated successfully!');
    } catch (error) {
      console.error('Error updating invoice:', error);
      alert('Error updating invoice. Please try again.');
    }
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBillID">
            <Form.Label>Bill ID</Form.Label>
            <Form.Control type="text" readOnly value={invoice.billID} />
          </Form.Group>

          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" readOnly value={invoice.bdate} />
          </Form.Group>
        </Row>

        {/* Update item fields here */}
        {items.map((item, index) => (
          <div key={index}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId={`formItemNumber${index}`}>
                <Form.Label>Item Number</Form.Label>
                <Form.Control
                  type="text"
                  value={item.itemNumber}
                  onChange={(e) => handleItemChange(index, 'itemNumber', e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formItemDescription${index}`}>
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                  type="text"
                  value={item.itemDescription}
                  onChange={(e) => handleItemChange(index, 'itemDescription', e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formQuantity${index}`}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formUnitPrice${index}`}>
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formTotalAmount${index}`}>
                <Form.Label>Total Amount</Form.Label>
                <Form.Control type="text" readOnly value={item.totalAmount} />
              </Form.Group>
            </Row>
          </div>
        ))}

        <Button variant="primary" type="submit">
          Update Invoice
        </Button>
      </Form>
    </div>
  );
};

export default EditInvoice;

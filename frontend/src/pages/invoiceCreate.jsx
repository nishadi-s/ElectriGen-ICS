import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

const InvoiceCreate = () => {
  const GenerateBillID = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const randomID = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
    return `${year}${month}${day}${randomID}`;
  };

  const [billID, setBillID] = useState(GenerateBillID());
  const [items, setItems] = useState([
    { itemNumber: '', itemDescription: '', quantity: '', unitPrice: '', totalAmount: '' },
    { itemNumber: '', itemDescription: '', quantity: '', unitPrice: '', totalAmount: '' },
    { itemNumber: '', itemDescription: '', quantity: '', unitPrice: '', totalAmount: '' },
    { itemNumber: '', itemDescription: '', quantity: '', unitPrice: '', totalAmount: '' },
    { itemNumber: '', itemDescription: '', quantity: '', unitPrice: '', totalAmount: '' },
  ]);

  const [bdate, setBdate] = useState("");

  useEffect(() => {
    setBillID(GenerateBillID());
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      totalAmount: (parseFloat(item.quantity || 0) * parseFloat(item.unitPrice || 0)).toFixed(2),
    }));
    if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
      setItems(updatedItems);}
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newSale ={
      billID,
      bdate,
      items,
    }

    axios.post('http://localhost:4000/sales/add', newSale)
    .then(()=>{
      alert("New Invoice successfully submited!");
     })
     .catch((err)=>{
      console.error('Error submitting invoice:', err);
      alert("Error submitting invoice. Please try again.");
     })
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBillID">
            <Form.Label>Bill ID</Form.Label>
            <Form.Control type="text" readOnly value={billID} />
          </Form.Group>

          <Form.Group as={Col} controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" readOnly value={new Date().toLocaleDateString()} 
            onChange={(e)=>{
              setBdate(e.target.value);
          }} />
          </Form.Group>
        </Row>

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

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formTotalQuantity">
            <Form.Label>Total Quantity</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={items.reduce((total, item) => total + parseFloat(item.quantity || 0), 0)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formTotalAmount">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={items.reduce((total, item) => total + parseFloat(item.totalAmount || 0), 0).toFixed(2)}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default InvoiceCreate;

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import SalesNavbar from '../components/SalesNavbar';

const InvoiceCreate = () => {
  const GenerateBillID = () => {
    const currentDate = new Date();
    const day = ('0' + currentDate.getDate()).slice(-2);
    const randomID = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
    return `${day}${randomID}`;
  };

  const [billID, setBillID] = useState('');
  const [items, setItems] = useState([{ ino: '', desc: '', qty: '', price: '', iamount: '' }]);
  const [bdate, setBdate] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    setBillID(GenerateBillID());
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products. Please try again later.');
    }
  };

  const handleItemChange = async (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    if (field === 'ino' && value) {
      const selectedProduct = products.find((product) => product.itemCode === value);
      if (selectedProduct) {
        updatedItems[index].desc = selectedProduct.name;
        updatedItems[index].price = selectedProduct.unitPrice;
        setItems(updatedItems);
      }
    }
  };

  useEffect(() => {
    const updatedItems = items.map((item) => ({
      ...item,
      iamount: (parseFloat(item.qty || 0) * parseFloat(item.price || 0)).toFixed(2),
    }));
    setItems(updatedItems);
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate total quantity and total amount
    const totalQuantity = items.reduce((total, item) => total + parseFloat(item.qty || 0), 0);
    const totalAmount = items.reduce((total, item) => total + parseFloat(item.iamount || 0), 0).toFixed(2);

    const newSale = {
      billID: billID,
      bdate: new Date().toISOString(),
      items,
      totqty: totalQuantity,
      tot: totalAmount,
    };

    try {
      const response = await axios.post('http://localhost:4000/sales/add', newSale);
      if (response.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Submitted!',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setError('Error submitting invoice. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
      setError('Error submitting invoice. Please try again.');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { ino: '', desc: '', qty: '', price: '', iamount: '' }]);
  };

  return (
    <SalesNavbar>
      <div>
        <h1>Create Invoice</h1>
        {error && <div className="error">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBillID">
              <Form.Label>Bill ID</Form.Label>
              <Form.Control type="text" readOnly value={billID} />
            </Form.Group>

            <Form.Group as={Col} controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={new Date().toLocaleDateString()}
                onChange={(e) => {
                  setBdate(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          {items.map((item, index) => (
            <div key={index}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId={`formItemNumber${index}`}>
                  <Form.Label>Item Number</Form.Label>
                  <Form.Control
                    as="select"
                    value={item.ino}
                    onChange={(e) => handleItemChange(index, 'ino', e.target.value)}
                  >
                    <option value="">Select an item number</option>
                    {products.map((product) => (
                      <option key={product._id} value={product.itemCode}>
                        {product.itemCode}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId={`formItemDescription${index}`}>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.desc}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formQuantity${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formUnitPrice${index}`}>
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formTotalAmount${index}`}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.iamount}
                    readOnly
                  />
                </Form.Group>

                <Button variant="danger" size="sm" onClick={() => handleRemoveItem(index)}>
                  Remove
                </Button>
              </Row>
            </div>
          ))}

          <Row className="mb-3">
            <Button variant="secondary" onClick={handleAddItem}>
              Add New Item
            </Button>

            <Form.Group as={Col} controlId="formTotalQuantity">
              <Form.Label>Total Quantity</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={items.reduce((total, item) => total + parseFloat(item.qty || 0), 0)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formTotalAmount">
                <Form.Label>Total Amount</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={items.reduce((total, item) => total + parseFloat(item.iamount || 0), 0).toFixed(2)}
                />
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

  export default InvoiceCreate;


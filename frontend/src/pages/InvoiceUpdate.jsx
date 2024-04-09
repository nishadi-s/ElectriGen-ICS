import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoiceUpdate = () => {
    const { billID } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/sales/get/${billID}`);
                console.log('Response data:', response.data);
                console.log('Response data items:', response.data.items);
                setInvoice(response.data);
                setItems(response.data.items); // Check the value here
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoice:', error);
                setLoading(false);
            }
        };
    
        fetchInvoice();
    }, [billID]);
    
    

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedInvoice = { ...invoice, items };
            await axios.put(`http://localhost:4000/sales/update/${invoice.billID}`, updatedInvoice);
            alert('Invoice updated successfully!');
        } catch (error) {
            console.error('Error updating invoice:', error);
            alert('Error updating invoice. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!invoice) return <div>No invoice found</div>;

    return (
        <div>
            <h1>Edit Invoice</h1>
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
                {console.log('Items:', items)}

                {items && items.length > 0 && items.map((item, index) => (
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

export default InvoiceUpdate;

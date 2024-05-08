import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavbarNishadi from './SupplierOrderNavbar';
import { useNavigate  } from 'react-router-dom';

const SupplierOrderForm = () => {
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState("");
  const [supID, setSupID] = useState("");
  const [items, setItems] = useState([{ Sup_matrial_code: '', M_Name: '', Sup_Quant: '' }]);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [recDate, setRecDate] = useState(new Date().toISOString().split('T')[0]);
  const [orderStatus, setOrderStatus] = useState("");
  const [rating, setRating] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/materials');
      // Extracting only the code and name fields from the response data
      const extractedMaterials = response.data.map(({ code, name }) => ({ Sup_matrial_code: code, M_Name: name }));
      setMaterials(extractedMaterials);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleItemChange = async (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    if (field === 'Sup_matrial_code' && value) {
      const selectedMaterial = materials.find((material) => material.Sup_matrial_code === value);
      if (selectedMaterial) {
        updatedItems[index].M_Name = selectedMaterial.M_Name;
        setItems(updatedItems);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateOrder()) {
      return;
    }

    const newSupplierOrder = {
      Sup_Ord_id: orderID,
      Sup_ID: supID,
      items,
      Sup_orded_date: orderDate,
      Sup_recpt_date: recDate,
      Sup_Ord_sts: orderStatus,
      Sup_rating: rating
    };

    try {
      await axios.post(`http://localhost:4000/api/supplier_order/`, newSupplierOrder);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Submitted!",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error('Error submitting supplier order:', err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error in Submitting!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const validateOrder = () => {
    if (!orderID.startsWith('OID')) {
      setOrderID('OID' + orderID);
    }

    if (!supID.match(/^[Ss]\d+/)) {
      setSupID('S' + supID);
    }

    if (new Date(recDate) <= new Date(orderDate)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Dates',
        text: 'Received date should be after the ordered date'
      });
      return false;
    }

    return true;
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { Sup_matrial_code: '', M_Name: '', Sup_Quant: '' }]);
  };

  return (
    <NavbarNishadi>
      <div>
        <h1>Create Export Order</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formSupplierOrderID">
              <Form.Label>Export Order ID</Form.Label>
              <Form.Control type="text" value={orderID} onChange={(e) => setOrderID(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formSupplierID">
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control type="text" value={supID} onChange={(e) => setSupID(e.target.value)} />
            </Form.Group>
          </Row>

          {items.map((item, index) => (
            <div key={index}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId={`formItemNumber${index}`}>
                  <Form.Label>Material Code</Form.Label>
                  <Form.Control
                    as="select"
                    value={item.Sup_matrial_code}
                    onChange={(e) => handleItemChange(index, 'Sup_matrial_code', e.target.value)}
                  >
                    <option value="">Select an item</option>
                    {materials.map((material) => (
                      <option key={material.Sup_matrial_code} value={material.Sup_matrial_code}>
                        {material.Sup_matrial_code}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId={`formItemName${index}`}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={item.M_Name}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} controlId={`formQuantity${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.Sup_Quant}
                    onChange={(e) => handleItemChange(index, 'Sup_Quant', e.target.value)}
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

            <Form.Group as={Col} controlId="formOrderDate">
              <Form.Label>Order Date</Form.Label>
              <Form.Control
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formReceivedDate">
              <Form.Label>Received Date</Form.Label>
              <Form.Control
                type="date"
                value={recDate}
                onChange={(e) => setRecDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formOrderStatus">
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                type="text"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </NavbarNishadi>
  );
};

export default SupplierOrderForm;

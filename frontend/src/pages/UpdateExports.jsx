import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../exports.css";
import ExportsNavBar from "../components/ExportsNavBar.jsx"; // Importing the ExportsNavBar component
import Swal from 'sweetalert2';

const UpdateExport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exportOrderID, setExportOrderID] = useState("");
  const [importer, setImporter] = useState("");
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [updatedItems, setUpdatedItems] = useState([]);
  const [oldQuantities, setOldQuantities] = useState({}); // Store old quantities

  useEffect(() => {
    const fetchExportData = async () => {
      try {
        const response = await fetch(`/api/export/${id}`);
        const exportData = await response.json();
        setExportOrderID(exportData.exportOrderID);
        setImporter(exportData.importer);
        setItems(exportData.items);
        setUpdatedItems([...exportData.items]);
        setTotalCost(exportData.totalCost);
        setStatus(exportData.status);

        // Fetch initial item quantities and store in oldQuantities
        const initialQuantities = {};
        for (const item of exportData.items) {
          initialQuantities[item.itemID] = item.quantity;
        }
        setOldQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching export data:", error);
      }
    };

    fetchExportData();
  }, [id]);

  const handleItemChange = (index, field, value) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][field] = value;
    setUpdatedItems(updatedItemsCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExport = {
      exportOrderID,
      importer,
      items: updatedItems,
      totalCost,
      status
    };

    try {
      const response = await fetch(`/api/export/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedExport),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const updatedExportData = await response.json();
        // Update export order details
        setExportOrderID(updatedExportData.exportOrderID);
        setImporter(updatedExportData.importer);
        setItems(updatedExportData.items);
        setUpdatedItems([...updatedExportData.items]);
        setTotalCost(updatedExportData.totalCost);
        setStatus(updatedExportData.status);
        setSuccessMessage('Export order updated successfully!');

        // Iterate through updated items to update product quantities
        for (const item of updatedItems) {
          try {
            // Fetch old quantity for the item
            const oldQuantity = oldQuantities[item.itemID];
            if (oldQuantity !== undefined) {
              // Calculate quantity difference
              const quantityDifference = item.quantity - oldQuantity;

              // Fetch product associated with the item code
              const productResponse = await fetch(`/api/products/itemCode/${item.itemID}`);
              if (productResponse.ok) {
                const productData = await productResponse.json();

                // Calculate new quantity for the product
                let newQuantity;
                if (quantityDifference > 0) {
                  newQuantity = productData.quantity - quantityDifference; // Subtract quantity difference
                } else {
                  newQuantity = productData.quantity + Math.abs(quantityDifference); // Add absolute value of quantity difference
                }

                // Update product quantity in the database
                const updateProductResponse = await fetch(`/api/products/${productData._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ quantity: newQuantity }),
                });

                if (!updateProductResponse.ok) {
                  throw new Error("Failed to update product quantity");
                }
              }
            }
          } catch (error) {
            console.error("Error updating product:", error);
            // Handle error updating product quantity
          }
        }

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Export order updated successfully!'
        });

        // Redirect to ExportsDashboard after a delay
        setTimeout(() => navigate('/ExportsDashboard'), 2000);
      } else {
        const errorData = await response.json();
        setError("Error updating export order: " + errorData.error);
        setEmptyFields(errorData.emptyFields || []);
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorData.error
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating the export order.");
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while updating the export order.'
      });
    }
  };

  return (
    <div className="update-ex with-background">
      <div className="update-export-container">
        <ExportsNavBar>
          <div className="update-export-form">
            <h2>Edit Order</h2>
            <form onSubmit={handleSubmit}>
              <label>Order ID:</label>
              <input
                type="text"
                value={exportOrderID}
                disabled
              />
              <label>Importer ID: </label>
              <input
                type="text"
                value={importer}
                onChange={(e) => setImporter(e.target.value)}
              />
              {updatedItems.map((item, index) => (
                <div key={index}>
                  <label>{`Item(${index + 1}) Item ID`}</label>
                  <input
                    type="text"
                    value={item.itemID}
                    onChange={(e) => handleItemChange(index, 'itemID', e.target.value)}
                  />
                  <label>{`Item(${index + 1}) Quantity`}</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </div>
              ))}
              <label>Total Cost(In Rs.): </label>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
              />
              <label>Status: </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="On the way to the destination country">On the way to the destination country</option>
                <option value="In transit">In Transit</option>
              </select><br/><br/>
              <button type="submit">Update</button>
              {error && <div className="error">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
            </form>
          </div>
        </ExportsNavBar>
      </div>
    </div>
  );
};

export default UpdateExport;

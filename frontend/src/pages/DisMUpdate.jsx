import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrdersContext } from "../hooks/useOrdersContext";
import "../DistributionFun.css";
import Swal from "sweetalert2";

const DisMUpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch: ordersDispatch } = useOrdersContext();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`, {});
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
        setUpdatedOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      setOrder(null);
      setUpdatedOrder({});
    };
  }, [id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...updatedOrder.items];
    updatedItems[index][name] = value;
    setUpdatedOrder((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const calculateTotalAmount = () => {
    if (!updatedOrder.items) return 0;

    const total = updatedOrder.items.reduce(
      (acc, item) => acc + item.unit * item.quantity,
      0
    );
    return total.toFixed(2);
  };

  const handleUpdate = async () => {
    // Show SweetAlert confirmation popup
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/orders/${order._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          });

          if (!response.ok) {
            throw new Error("Failed to update order");
          }

          // Dispatch the updated order to the context
          ordersDispatch({ type: "UPDATE_ORDER", payload: updatedOrder });

          // Check if the order status is approved
          if (updatedOrder.orderStatus === "Approved") {
            // Iterate through each item in the updated order
            for (const item of updatedOrder.items) {
              try {
                // Fetch the product associated with the item code
                const productResponse = await fetch(
                  `/api/products/itemCode/${item.code}`
                );
                if (!productResponse.ok) {
                  throw new Error("Failed to fetch product");
                }
                const productData = await productResponse.json();

                // Calculate the new quantity for the product
                const newQuantity = productData.quantity - item.quantity;

                // Update the product quantity in the database
                const updateProductResponse = await fetch(
                  `/api/products/${productData._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                  }
                );

                if (!updateProductResponse.ok) {
                  throw new Error("Failed to update product quantity");
                }
              } catch (error) {
                console.error("Error updating product:", error);
                // Handle error updating product quantity
              }
            }
          }

          // Navigate to OrderHistory
          navigate("/DisMOrderHistory");
        } catch (error) {
          console.error("Error updating order:", error);
          setError(error.message);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="update-order">
      <h1>Order Modification</h1>
      <form class="update-form">
        <h3>Update Order Form</h3>

        <div class="input-group">
          <label for="distributorId">Distributor ID</label>
          <input
            type="text"
            id="distributorId"
            name="distributorId"
            class="input-field"
            value={updatedOrder.distributorId}
            readOnly
          />
        </div>

        <div class="input-group">
          <label for="distributorName">Distributor's Name</label>
          <input
            type="text"
            id="distributorName"
            name="distributorName"
            class="input-field"
            value={updatedOrder.distributorName}
            readOnly
          />
        </div>

        <div class="input-group">
          <label for="orderStatus">Order Status</label>
          <select
            id="orderStatus"
            name="orderStatus"
            className="input-field"
            value={updatedOrder.orderStatus}
            onChange={(e) =>
              setUpdatedOrder((prevState) => ({
                ...prevState,
                orderStatus: e.target.value,
              }))
            }
          >
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        {/* Items List */}
        {updatedOrder.items &&
          updatedOrder.items.map((item, index) => (
            <div key={index} class="item-container">
              <label for={`itemCode${index}`} class="item-label">
                Item({index + 1}) Code
              </label>
              <input
                type="text"
                id={`itemCode${index}`}
                name={`code`}
                class="item-field"
                value={item.code}
                readOnly
              />

              <label for={`itemName${index}`} class="item-label">
                Item({index + 1}) Name
              </label>
              <input
                type="text"
                id={`itemName${index}`}
                name={`name`}
                class="item-field"
                value={item.name}
                readOnly
              />

              <label for={`itemUnit${index}`} class="item-label">
                Item({index + 1}) Unit Price
              </label>
              <input
                type="number"
                id={`itemUnit${index}`}
                name={`unit`}
                class="item-field"
                value={item.unit}
                readOnly
              />

              <label for={`itemQuantity${index}`} class="item-label">
                Item({index + 1}) Quantity
              </label>
              <input
                type="number"
                id={`itemQuantity${index}`}
                name={`quantity`}
                class="item-field"
                value={item.quantity}
                readOnly
              />
            </div>
          ))}

        {/* Total Amount Field */}
        <div class="input-group">
          <label for="totalAmount">Total Amount to Pay</label>
          <input
            type="text"
            id="totalAmount"
            name="totalAmount"
            class="input-field"
            value={calculateTotalAmount()}
            readOnly
          />
        </div>

        {/* Update Button */}
        <button type="button" class="custom-button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default DisMUpdateOrder;

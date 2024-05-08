import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdersContext } from "../hooks/useOrdersContext";
import Swal from 'sweetalert2';

const OrderForm = () => {
  const { dispatch } = useOrdersContext();
  const navigate = useNavigate();

  const [distributorId, setDistributorId] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [orderStatus] = useState("Placed");
  const [items, setItems] = useState([{ code: "", name: "", unit: "", quantity: "" }]);
  const [totalAmount, setTotalAmount] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [productCodes, setProductCodes] = useState([]);
  const [productsMap, setProductsMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("/api/products");
        const productsData = await productsResponse.json();
        if (productsResponse.ok) {
          const itemCodes = productsData.map((product) => product.itemCode);
          setProductCodes(itemCodes);
          const productsMap = {};
          productsData.forEach((product) => {
            productsMap[product.itemCode] = {
              name: product.name,
              unit: product.unitPrice,
            };
          });
          setProductsMap(productsMap);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const calculateTotalAmount = () => {
    const total = items.reduce(
      (acc, item) => acc + (item.unit * item.quantity || 0),
      0
    );
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [items]);

  const validateDistributorId = (id) => {
    return /^DS\d{5}$/.test(id);
  };

  const validateQuantity = (quantity) => {
    return quantity >= 50;
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "code") {
      const product = productsMap[value];
      if (product) {
        updatedItems[index].name = product.name;
        updatedItems[index].unit = product.unit;
      } else {
        updatedItems[index].name = "";
        updatedItems[index].unit = "";
      }
    }
    setItems(updatedItems);
  };

  const addNewItem = () => {
    setItems([...items, { code: "", name: "", unit: "", quantity: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDistributorId(distributorId)) {
      setError("Distributor ID must start with 'DS' followed by 5 digits");
      return;
    }

    if (!distributorName) {
      setError("Please enter the distributor's name");
      return;
    }

    if (!totalAmount) {
      setError("Total amount is required");
      return;
    }

    if (
      items.some(
        (item) =>
          !item.code ||
          !item.name ||
          !item.unit ||
          !item.quantity ||
          !validateQuantity(item.quantity)
      )
    ) {
      setError("Please fill in all fields correctly");
      return;
    }

    if (items.some((item) => !item.code.startsWith("DP"))) {
      setError('Item code should start with "DP"');
      return;
    }

    try {
      const order = {
        distributorId,
        distributorName,
        orderStatus,
        items,
        totalAmount,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        for (const item of items) {
          await fetch(`/api/products/${item.code}`, {
            method: "PUT",
            body: JSON.stringify({ quantity: -item.quantity }), // Deduct quantity
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        setDistributorId("");
        setDistributorName("");
        setItems([{ code: "", name: "", unit: "", quantity: "" }]);
        setTotalAmount("");

        setError(null);
        setEmptyFields([]);
        console.log("new order added", json);
        dispatch({ type: "CREATE_ORDER", payload: json });
        
      // SweetAlert success pop-up
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your order has been successfully placed.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Navigate to OrderHistory page
        navigate("/OrderHistory");
      });
    }
  } catch (error) {
    setError("An error occurred while submitting the order.");
    console.error("Error submitting order:", error);
  }
};

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Order Placement Form</h3>

      <div className="input-group">
        <label htmlFor="distributorId">Distributor ID</label>
        <input
          type="text"
          id="distributorId"
          onChange={(e) => setDistributorId(e.target.value)}
          value={distributorId}
          className={
            !validateDistributorId(distributorId) ||
            emptyFields.includes("distributorId")
              ? "error"
              : ""
          }
        />
      </div>

      <div className="input-group">
        <label htmlFor="distributorName">Distributor's Name</label>
        <input
          type="text"
          id="distributorName"
          onChange={(e) => setDistributorName(e.target.value)}
          value={distributorName}
          className={emptyFields.includes("distributorName") ? "error" : ""}
        />
      </div>

      <div className="input-group">
        <label htmlFor="orderStatus">Order Status</label>
        <input type="text" id="orderStatus" value={orderStatus} readOnly />
      </div>

      <label className="item-label1">Select Items</label>
      <div className="item-container">
        {items.map((item, index) => (
          <div key={index} className="item-fields">
            <label className="item-label">Item({index + 1}) Code</label>
            <select
              value={item.code}
              onChange={(e) => handleItemChange(index, "code", e.target.value)}
              className="item-select"
            >
              <option value="">Select item code</option>
              {productCodes.map((code, i) => (
                <option key={i} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <label className="item-label">Item({index + 1}) Name</label>
            <input type="text" value={item.name} readOnly />
            <label className="item-label">Item({index + 1}) Unit Price (In LKR)</label>
            <input type="number" value={item.unit} readOnly />
            <label className="item-label">Item({index + 1}) Quantity</label>
            <input
              type="number"
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              value={item.quantity}
              className={!validateQuantity(item.quantity) ? "error" : ""}
            />
            <label className="item-label">Item({index + 1}) Total Price (In LKR)</label>
            <input type="text" value={item.unit * item.quantity} readOnly />
          </div>
        ))}
      </div>

      <button type="button" onClick={addNewItem}>
        Add Item
      </button>

      <div className="input-group">
        <label htmlFor="totalAmount">Total Amount to Pay (In LKR)</label>
        <input type="number" id="totalAmount" value={totalAmount} readOnly />
      </div>

      <button type="submit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default OrderForm;
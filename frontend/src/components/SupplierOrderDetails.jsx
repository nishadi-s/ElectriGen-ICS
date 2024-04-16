import React from "react";
import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";
import { format, formatDistanceToNow } from 'date-fns'; // Import format and formatDistanceToNow from date-fns
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../SupplierOrder.css';

const SupplierOrderDetails = ({ order }) => {
  const { dispatch } = useSupplierOrderContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/supplierOrder/${order._id}`); // Navigate to the edit form page with supplier order ID
  };

  const handleClick = async () => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this order. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Blue color for delete button
      cancelButtonColor: '#d33', // Red color for cancel button
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      const response = await fetch('/api/supplier_order/' + order._id, {
        method: 'DELETE'
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_ORDER', payload: json });
        Swal.fire('Deleted!', 'The order has been deleted.', 'success');
      } else {
        // If deletion fails
        Swal.fire('Error!', 'Failed to delete the order.', 'error');
      }
    }
  };

  return (
    <div className="Supplier-Order-Details">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Supplier ID</th>
            <th>Ordered Date</th>
            <th>Receipt Date</th>
            <th>Order Status</th>
            <th>Supplier Rating</th>
            <th>Items</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order.Sup_Ord_id}</td>
            <td>{order.Sup_ID}</td>
            <td>{format(new Date(order.Sup_orded_date), 'yyyy-MM-dd')}</td>
            <td>{format(new Date(order.Sup_recpt_date), 'yyyy-MM-dd')}</td>
            <td>{order.Sup_Ord_sts}</td>
            <td>{order.Sup_rating}</td>
            <td>
              {order.items.map((item, index) => (
                <div key={index}>
                  <p><strong>Item {index + 1} Quantity: </strong>{item.Sup_Quant}</p>
                  <p><strong>Item {index + 1} Cost: </strong>{item.Sup_Cost}</p>
                  <p><strong>Item {index + 1} Code: </strong>{item.Sup_matrial_code}</p>
                </div>
              ))}
            </td>
            <td>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</td>
            <td>
              <button className='button1' onClick={handleEdit}>Edit</button>
              <br/>
              <br/>
              <button onClick={handleClick} className="button2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SupplierOrderDetails;

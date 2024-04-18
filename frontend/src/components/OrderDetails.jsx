import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Swal from 'sweetalert2';
import { useDisDAuthContext } from '../hooks/useDisDAuthContext.jsx';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../DistributionFun.css'

const OrderDetails = ({ order }) => {
    const { dispatch } = useOrdersContext();
    const { distributor } = useDisDAuthContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (!distributor) {
            return;
        }
        const result = await Swal.fire({
            title: "Do you want to delete this record?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('/api/orders/' + order._id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${distributor.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'DELETE_ORDER', payload: json });
                    Swal.fire("Deleted", "", "success");
                } else {
                    throw new Error('Failed to delete order');
                }
            } catch (error) {
                console.error(error);
                Swal.fire("Error Occurred", "Failed to delete order. Please try again.", "error");
            }
        }
    };

    const handleEdit = () => {
        navigate(`/update/${order._id}`);
    };

    return (
        <div className="order-details">
  <Paper style={{ width: '100%' }}>
    <Table aria-label="order-details-table">
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Distributor ID</TableCell>
          <TableCell>Distributor Name</TableCell>
          <TableCell>Order Status</TableCell>

          {/* Item details headers */}
          <TableCell>Item Code</TableCell>
          <TableCell>Item Name</TableCell>
          <TableCell>Unit Price(lkr)</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total Cost(lkr)</TableCell>

          <TableCell>Total Amount to Pay(lkr)</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Display details for each item */}
        {order.items.map((item, index) => (
          <TableRow key={index}>
            {/* Display order details only for the first item */}
            {index === 0 && (
              <>
                <TableCell rowSpan={order.items.length}>{order._id}</TableCell>
                <TableCell rowSpan={order.items.length}>{order.distributorId}</TableCell>
                <TableCell rowSpan={order.items.length}>{order.distributorName}</TableCell>
                <TableCell rowSpan={order.items.length}>{order.orderStatus}</TableCell>
              </>
            )}
            {/* Display item details */}
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.unit * item.quantity}</TableCell>
            {/* Display total amount to pay and created at */}
            {index === 0 && ( // Only display these once for the first item
              <>
                <TableCell rowSpan={order.items.length}>{order.totalAmount}</TableCell>
                <TableCell rowSpan={order.items.length}>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</TableCell>
                <TableCell rowSpan={order.items.length}>
                  {/* Action buttons */}
                  <div className="action-buttons">
                    <button onClick={handleClick} className="btn-delete">Delete</button>
                    <button onClick={handleEdit} className="btn-edit">Edit</button>
                  </div>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
</div>
    );
};

export default OrderDetails;
import NavbarNishadi from '../components/SupplierOrderNavbar';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import SupplierOrderDetails from "../components/SupplierOrderDetails";

const DashBoardN = () => {
  const location = useLocation();
  const orders = location?.state?.orders || [];
  const [todaysOrders, setTodaysOrders] = useState([]);

  useEffect(() => {
    // Get today's date
    const today = new Date();
    // Format today's date to match the format of the createdAt field in orders
    const todayFormatted = format(today, 'yyyy-MM-dd');

    // Filter orders to get only those added today
    const filteredOrders = orders.filter(order => format(new Date(order.Sup_orded_date), 'yyyy-MM-dd') === todayFormatted);
    setTodaysOrders(filteredOrders);
  }, [orders]);

  return (
    <NavbarNishadi>
      <div>
        <h1>Order Dashboard - Today's Orders</h1>
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
            </tr>
          </thead>
          <tbody>
            {todaysOrders.length > 0 ? (
              todaysOrders.map(order => (
                <SupplierOrderDetails key={order.Sup_Ord_id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders added today</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </NavbarNishadi>
  );
}

export default DashBoardN;

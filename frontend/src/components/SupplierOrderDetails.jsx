import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";
import { format, formatDistanceToNow } from 'date-fns'; // Import format and formatDistanceToNow from date-fns

const SupplierOrderDetails = ({ order }) => {
  const { dispatch } = useSupplierOrderContext();

  const handleClick = async () => {
    const response = await fetch('/api/supplier_order/' + order._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_ORDER', payload: json });
    }
  };

  return (
    <div className="Supplier-Order-Details">
      <h6><strong>Order ID:</strong> {order.Sup_Ord_id}</h6>
      <p><strong>Supplier ID:</strong> {order.Sup_ID}</p>
      <p><strong>Quantity:</strong> {order.Sup_Quant}</p>
      <p><strong>Cost:</strong> {order.Sup_Cost}</p>
      <p><strong>Material Code:</strong> {order.Sup_matrial_code}</p>
      <p><strong>Ordered Date: </strong>{format(new Date(order.Sup_orded_date), 'yyyy-MM-dd')} </p>
      <p><strong>Receipt Date:</strong> {format(new Date(order.Sup_recpt_date), 'yyyy-MM-dd')}</p>
      <p><strong>Order Status:</strong> {order.Sup_Ord_sts}</p>
      <p><strong>Supplier Rating:</strong> {order.Sup_rating}</p>
      <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}> Delete</span>
    </div>
  );
}

export default SupplierOrderDetails;

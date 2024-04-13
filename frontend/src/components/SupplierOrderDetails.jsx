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

      {order.items.map((item, index) => (
        <div key={index}>
          <p><strong>Item {index + 1} Quantity: </strong>{item.Sup_Quant}</p>
          <p><strong>Item {index + 1} Cost: </strong>{item.Sup_Cost}</p>
          <p><strong>Item {index + 1} Code: </strong>{item.Sup_matrial_code}</p>
        </div>
      ))}

     
      <p><strong>Ordered Date: </strong>{format(new Date(order.Sup_orded_date), 'yyyy-MM-dd')} </p>
      <p><strong>Receipt Date:</strong> {format(new Date(order.Sup_recpt_date), 'yyyy-MM-dd')}</p>
      <p><strong>Order Status:</strong> {order.Sup_Ord_sts}</p>
      <p><strong>Supplier Rating:</strong> {order.Sup_rating}</p>
      <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
      
      <button onClick={handleClick} className="btn-delete">Delete</button>
    </div>
  );
}

export default SupplierOrderDetails;

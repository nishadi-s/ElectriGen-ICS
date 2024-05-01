import { useContext } from 'react';
import { SupplierContext } from "../context/SupplierContext";
import {useNavigate} from 'react-router-dom'


const SupplierDetails = ({ supplier }) => {
  const navigate = useNavigate ()
  const { dispatch } = useContext(SupplierContext);
  

  const handleClick = async () => {
    const response = await fetch('/api/supplier/' + supplier._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_SUPPLIER', payload: json });
    }
  };
  
  return (
    <div className="Supplier-Details">
      <h6><strong>Supplier ID:</strong> {supplier.Sup_ID}</h6>
      <p><strong>Supplier Name:</strong> {supplier.Sup_Name}</p>
      <p><strong>Supplier Email:</strong> {supplier.Sup_Email}</p>
      <p><strong>Supplier Contact:</strong> {supplier.Sup_Contact}</p>
      <p><strong>Supplier Order ID:</strong> {supplier.Sup_Ord_id}</p>
      <p><strong>Supplier Order Material Code:</strong> {supplier.Sup_matrial_code}</p>
      <button onClick={() => navigate ('supplieredit')}>Edit Details</button>
      <button onClick={handleClick}> Delete</button>
    </div>
  );
}

export default SupplierDetails;

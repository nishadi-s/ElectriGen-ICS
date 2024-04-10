import React, { useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';
import { useNavigate } from 'react-router-dom';
import '../SupplierOrder.css';

const SupplierDetails = ({ supplier }) => {
  const navigate = useNavigate();
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
    <table className='table'>
      <thead>
    <tr>
      <th scope = "col"> Supplier ID</th>
      <th scope = "col"> Supplier Name</th>
      <th scope = "col"> Supplier Email</th>
      <th scope = "col"> Supplier Contact</th>
      <th scope = "col"> Supplier Order ID</th>
      <th scope = "col"> Material Code</th>
      <th scope = "col"> Edit</th>
      <th scope = "col"> Delete</th>
</tr>
</thead>
<tbody>
<tr>
      <td>{supplier.Sup_ID}</td>
      <td>{supplier.Sup_Name}</td>
      <td>{supplier.Sup_Email}</td>
      <td>{supplier.Sup_Contact}</td>
      <td>{supplier.Sup_Ord_id}</td>
      <td>{supplier.Sup_matrial_code}</td>
      <td>
        <button className='button1' onClick={() => navigate('supplieredit')}>Edit</button> </td>
       <td> <button className='button2' onClick={handleClick}>Delete</button> </td>
      
    </tr>
    </tbody>
    </table>
  );
};

export default SupplierDetails;

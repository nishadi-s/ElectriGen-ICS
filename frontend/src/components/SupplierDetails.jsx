import React, { useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../SupplierOrder.css';

const SupplierDetails = ({ supplier }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(SupplierContext);

  const handleEdit = () => {
    navigate(`/supplier/${supplier._id}`);
  };

  const handleDelete = async () => {
    // Use SweetAlert to display a confirmation dialog
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you will not be able to recover this supplier!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    // If the user confirms the deletion, proceed with the deletion process
    if (confirmation.isConfirmed) {
      const response = await fetch('/api/supplier/' + supplier._id, {
        method: 'DELETE'
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'DELETE_SUPPLIER', payload: json });
        Swal.fire(
          'Deleted!',
          'The supplier has been deleted.',
          'success'
        );
      } else {
        Swal.fire(
          'Error!',
          'Failed to delete the supplier.',
          'error'
        );
      }
    }
  };

  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Contact</th>
          <th scope="col">Order ID</th>
          <th scope="col">Material Code</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
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
            <button className='Sup_button1' onClick={handleEdit}>Edit</button>
          </td>
          <td>
            <button className='Sup_button2' onClick={handleDelete}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SupplierDetails;

import '../exports.css';
import { useExportsContext } from '../hooks/useExportsContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import { useState, useEffect } from 'react';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Swal from 'sweetalert2'; // Import SweetAlert


const ExportDetails=({exportt})=>{
    const {dispatch}=useExportsContext()

    const handleClick = async () => {
        // Display confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this export order!',
            icon: 'warning',
            cancelButtonColor:'#1976D2',
            confirmButtonColor:'#F44336',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                // If confirmed, proceed with deletion
                const response = await fetch('/api/export/' + exportt._id, {
                    method: 'DELETE'
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'DELETE_EXPORT', payload: json });
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Export order has been deleted.',
                        icon: 'success',
                      });
                    } else {
                        Swal.fire({
                          title: 'Error!',
                          text: 'Failed to delete the export order.',
                          icon: 'error'
                        });
                      }
                    } catch (error) {
                      console.error('Error deleting export order:', error);
                      Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while deleting the export order.',
                        icon: 'error'
                      });
                    }
                  }
                });
              };

    

    return(
      
        <div className="export-details">
          
            <h4>{exportt.exportOrderID}</h4>
            <p><strong>Importer ID: </strong>{exportt.importer}</p>

            {exportt.items.map((item, index) => (
                <div key={index}>
                    <p><strong>Item {index + 1} Item ID: </strong>{item.itemID}</p>
                    <p><strong>Item {index + 1} Quantity: </strong>{item.quantity}</p>
                    
                </div>
            ))}

            <p><strong>Total Cost: </strong>{exportt.totalCost}</p>
            <p><strong>Status: </strong>{exportt.status}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(exportt.createdAt),{addSuffix:true})}</p>           
            <span className="delete-button material-symbols-outlined" onClick={handleClick}>Delete</span><br></br>
            <Link to={`/UpdateExports/${exportt._id}`} className="edit-button">Edit</Link> {/* Add Link for Edit button */}
            <br></br><br></br>
        </div>
        
    )
}

export default ExportDetails
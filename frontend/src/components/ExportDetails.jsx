import '../exports.css';
import { useExportsContext } from '../hooks/useExportsContext';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const ExportDetails = ({ exportt }) => {
  const { dispatch } = useExportsContext();

  const handleClick = async () => {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this export order!',
      icon: 'warning',
      cancelButtonColor: '#1976D2',
      confirmButtonColor: '#F44336',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
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

  return (
    <div className="export-details-container">
      <h2 className="export-details-header">{exportt.exportOrderID}</h2>
      <table className="export-details-table">
        <tbody>
        <tr>
            <td><strong>Order ID:</strong></td>
            <td>{exportt.exportOrderID}</td>
          </tr>

          <tr>
            <td><strong>Importer ID:</strong></td>
            <td>{exportt.importer}</td>
          </tr>
          {exportt.items.map((item, index) => (
            <tr key={index}>
              <td><strong>Item {index + 1}:</strong></td>
              <td>{item.itemID}</td>
              <td><strong>Quantity:</strong></td>
              <td>{item.quantity}</td>
              <td><strong>Unit Cost:</strong></td>
              <td>{item.unitPrice}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total Cost (In Rs.):</strong></td>
            <td colSpan="3">{exportt.totalCost}</td>
          </tr>
          <tr>
            <td><strong>Status:</strong></td>
            <td colSpan="3">{exportt.status}</td>
          </tr>
          <tr>
            <td><strong>Created:</strong></td>
            <td colSpan="3">{format(new Date(exportt.createdAt), 'MMMM dd, yyyy')}</td>
          </tr>
        </tbody>
      </table>
      <div className="export-details-actions">
        <button onClick={handleClick} className="delete-button">Delete</button>
        <Link to={`/UpdateExports/${exportt._id}`} className="edit-button">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default ExportDetails;

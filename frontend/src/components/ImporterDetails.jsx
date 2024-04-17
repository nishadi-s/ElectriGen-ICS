
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ImporterDetails = ({ importer }) => {
  return (
    <div className="importer-details-container">
      <h5 className="importer-details-header">{importer.importerID}</h5>
      <table className="importer-details-table">
        <tbody>
        <tr>
            <th>Importer ID:</th>
            <td>{importer.importerID}</td>
          </tr>
          <tr>
            <th>Importer Name:</th>
            <td>{importer.importerName}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{importer.address}</td>
          </tr>
          <tr>
            <th>Contact Number:</th>
            <td>{importer.contactNumber}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{importer.email}</td>
          </tr>
          <tr>
            <th>Created:</th>
            <td>{formatDistanceToNow(new Date(importer.createdAt), { addSuffix: true })}</td>
          </tr>
      </tbody>
      </table>
      <div className="importer-details-actions">
        <Link to={`/ImporterUpdate/${importer._id}`} style={{ textDecoration: 'none' }}>
          <button className="edit-button">Edit</button>
        </Link>
      </div>
    </div>
  );
}

export default ImporterDetails;

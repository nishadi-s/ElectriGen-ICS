import '../exports.css';
//import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import { useState, useEffect } from 'react';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ImporterDetails=({importer})=>{
   

    return(
        
        <div className="importer-details">
            <h4>{importer.importerID}</h4>
            
            <p><strong>Importer Name: </strong>{importer.importerName}</p>
            <p><strong>Address: </strong>{importer.address}</p>
            <p><strong>Contact Number: </strong>{importer.contactNumber}</p>
            <p><strong>Email: </strong>{importer.email}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(importer.createdAt),{addSuffix:true})}</p>
            
            <br></br>
            
        </div>
    
    )
}

export default ImporterDetails
import '../exports.css';
import { useExportsContext } from '../hooks/useExportsContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import { useState, useEffect } from 'react';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const ExportDetails=({exportt})=>{
    const {dispatch}=useExportsContext()

    const handleClick = async ()=>{
        const response = await fetch('/api/export/'+exportt._id,{
            method:'DELETE'
        })
        const json=await response.json()

        if(response.ok){
            dispatch({type:'DELETE_EXPORT',payload:json})
        }
    }

    return(
        <div className="export-details">
            <h4>{exportt.exportOrderID}</h4>
            <p><strong>Importer: </strong>{exportt.importer}</p>

            {exportt.items.map((item, index) => (
                <div key={index}>
                    <p><strong>Item {index + 1} Item ID: </strong>{item.itemID}</p>
                    <p><strong>Item {index + 1} Quantity: </strong>{item.quantity}</p>
                    
                </div>
            ))}

            <p><strong>Total Cost: </strong>{exportt.totalCost}</p>
            <p><strong>Status: </strong>{exportt.status}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(exportt.createdAt),{addSuffix:true})}</p>
            <p><strong>Updated: </strong>{formatDistanceToNow(new Date(exportt.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span><br></br>
            <Link to={`/update/${exportt._id}`}>Edit</Link> {/* Add Link for Edit button */}
            <br></br><br></br>
        </div>
    )
}

export default ExportDetails
import { useState } from "react"
import '../exports.css';
import { useImportersContext } from "../hooks/useImportersContext";
import {  useEffect } from "react";

const ImporterForm=()=>{
    const {dispatch}=useImportersContext()
    const [importerID,setimporterID] = useState('')
    const [importerName,setimporterName] = useState('')
    const [address,setaddress] = useState('')
    const [contactNumber,setcontactNumber] = useState('')
    const [email,setemail] = useState('')
    const [error,setError]=useState(null)
    const[emptyFields,setEmptyFields]=useState([])
    const [successMessage, setSuccessMessage] = useState('');

    

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const importer={importerID,importerName,address,contactNumber,email}

        const response=await fetch('/api/importer',{
            method: 'POST',
            body: JSON.stringify(importer),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setimporterID('')
            setimporterName('')
            setaddress('')
            setcontactNumber('')
            setemail('')
            setError('')
            setError(null)
            setEmptyFields([])
            console.log('New importer added',json)
            dispatch({type: 'CREATE_IMPORTER',payload:json})
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000); // Adjust the delay as needed (e.g., 3000 milliseconds = 3 seconds)

        return () => clearTimeout(timer);
    }, [successMessage]);


    return(
        <form className="importerCreate" onSubmit={handleSubmit}>
        <h3>Add a new Importer</h3>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <label>ImporterID: </label><br></br>
        <input
            type="text"
            onChange={(e)=>setimporterID(e.target.value)}
            value={importerID}
            className={emptyFields.includes('importerID')?'error':''}
        /><br></br>

        <label>Importer Name: </label><br></br>
        <input
            type="text"
            onChange={(e)=>setimporterName(e.target.value)}
            value={importerName}
            className={emptyFields.includes('importerName')?'error':''}
        /><br></br>

        <label>Address: </label><br></br>
        <input
            type="text"
            onChange={(e)=>setaddress(e.target.value)}
            value={address}
            className={emptyFields.includes('address')?'error':''}
        /><br></br>

        <label>Contact Number: </label><br></br>
        <input
            type="number"
            onChange={(e)=>setcontactNumber(e.target.value)}
            value={contactNumber}
            className={emptyFields.includes('contactNumber')?'error':''}
        /><br></br>

        <label>Email: </label><br></br>
        <input
            type="text"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            className={emptyFields.includes('email')?'error':''}
        /><br></br><br></br>

        <button>Add Importer</button>
        {error && <div className="error">{error}</div>}

        </form>

    )
}

export default ImporterForm
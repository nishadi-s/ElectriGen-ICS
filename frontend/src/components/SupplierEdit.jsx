import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert";
import NavbarNishadi from '../components/SupplierOrderNavbar'

const EditSupplier = () => {
  const { id } = useParams();
  const [Sup_ID, setSupplier_ID] = useState("");
  const [Sup_Name, setSupplier_name] = useState("");
  const [Sup_Email, setEmail] = useState("");
  const [Sup_Contact, setContact] = useState("");
  const [Sup_Ord_id, setSup_Ord_id] = useState("");
  const [Sup_matrial_code, setMaterial_code] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`/api/supplier/${id}`);
        const supplierData = await response.json();

        setSupplier_ID(supplierData.Sup_ID);
        setSupplier_name(supplierData.Sup_Name);
        setEmail(supplierData.Sup_Email);
        setContact(supplierData.Sup_Contact);
        setSup_Ord_id(supplierData.Sup_Ord_id);
        setMaterial_code(supplierData.Sup_matrial_code);
      } catch (error) {
        console.error('Error fetching suppliers');
      }
    };
    fetchSuppliers();
  }, [id]);

  const handleEditSupplier = async () => {
    navigate(`/Suppliers/`);
    const updatedSupplier = {
      Sup_ID,
      Sup_Name,
      Sup_Email,
      Sup_Contact,
      Sup_Ord_id,
      Sup_matrial_code
    };

    try {
      const response = await fetch(`/api/supplier/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedSupplier),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedSupplierData = await response.json();
        setSupplier_ID(updatedSupplierData.Sup_ID);
        setSupplier_name(updatedSupplierData.Sup_Name);
        setEmail(updatedSupplierData.Sup_Email);
        setContact(updatedSupplierData.Sup_Contact);
        setSup_Ord_id(updatedSupplierData.Sup_Ord_id);
        setMaterial_code(updatedSupplierData.Sup_matrial_code);
      
        Swal({
          title: "Success",
          text: "Supplier updated successfully",
          icon: "success",
          button: "OK",
        }).then(() => {
          navigate('/Suppliers'); // Redirect to suppliers page 
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error ? errorData.error : "Error updating product");
        setEmptyFields(errorData.emptyFields ? errorData.emptyFields : []);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      setError("Error updating supplier. Please try again.");
    }
  };

  return (
    <NavbarNishadi>
      <form className="update-supplier">
        <h1 className="text-3xl my-4">Edit Supplier</h1>
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          {/* Supplier ID */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier ID:</label>
            <input
              type="text"
              readOnly
              value={Sup_ID}
              onChange={(e) => setSupplier_ID(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          {/* Supplier Name */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier Name:</label>
            <input
              type="text"
              value={Sup_Name}
              onChange={(e) => setSupplier_name(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          {/* Supplier Email */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier Email:</label>
            <input
              type="text"
              value={Sup_Email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          {/* Supplier Contact Numbers */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier Contact Numbers:</label>
            <input
              type="text"
              value={Sup_Contact}
              onChange={(e) => setContact(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          {/* Supplier Order ID */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier Order ID:</label>
            <input
              type="text"
              value={Sup_Ord_id}
              onChange={(e) => setSup_Ord_id(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          {/* Supplier Material Code */}
          <div className="my-4">
            <label className='text-xl mr-4 text-gray-500'>Supplier Material Code:</label>
            <input
              type="text"
              value={Sup_matrial_code}
              onChange={(e) => setMaterial_code(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          
          {/* Edit Button */}
          <button className='Sup_button' onClick={handleEditSupplier}>
            Update Supplier
          </button>
          {/* Error Message */}
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </NavbarNishadi>
  );
}

export default EditSupplier;

import React from "react";
import Swal from "sweetalert2";
import SalesNavbar from "../components/SalesNavbar";
import "../sales.css";

const Logout = () => {
  const handleLogout = async () => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#233066",
      cancelButtonColor: "#EC2026",
      confirmButtonText: "Yes, logout"
    });

    if (result.isConfirmed) {
      try {
        
        await Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success"
        });

        
        sessionStorage.clear(); 

        
        window.location.replace("/Home");

        
        window.history.pushState(null, "", "/Home");
        window.history.forward();
      } catch (error) {
        console.error('Logout error:', error);
        // Show error alert using Swal
        Swal.fire({
          title: "Error",
          text: "Logout failed. Please try again later.",
          icon: "error"
        });
      }
    }
  };

  return (
    <SalesNavbar>
      <div>
        <h1 className="sales-header">Logout</h1>
        <button onClick={handleLogout} className="btn btn-primary mt-10 mb-5">Logout</button>
      </div>
    </SalesNavbar>
  );
};

export default Logout;


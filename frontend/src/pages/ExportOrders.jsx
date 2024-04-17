import React from "react";
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import '../exports.css';
//components
import ExportForm from '../components/ExportForm' 

const Exportorders = () => {
  return (
    <div className="export-orders with-background">
    <ExportsNavBar>
    <div>
      <div>
      <h1>Export Orders</h1><br></br>
      </div>
      <ExportForm/>
    </div>
    </ExportsNavBar>
    </div>
  );
  
};

export default Exportorders;

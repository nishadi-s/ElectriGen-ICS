import React from "react";
import ExportsNavBar from "../components/ExportsNavBar.jsx";

//components
import ExportForm from '../components/ExportForm' 

const Exportorders = () => {
  return (
    <ExportsNavBar>
    <div>
      <div>
      <h1>Export Orders</h1><br></br>
      </div>
      <ExportForm/>
    </div>
    </ExportsNavBar>
  );
};

export default Exportorders;

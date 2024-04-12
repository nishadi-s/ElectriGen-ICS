import React from "react";
import ExportsNavBar from "../components/ExportsNavBar.jsx";

//components
import ImporterForm from '../components/ImporterForm' 

const Importers = () => {
  
  return (
    <ExportsNavBar>
    <div>
      <div>
      <h1>Importers</h1><br></br>
      </div>
      <ImporterForm/>
    </div>
    </ExportsNavBar>
  );
  
};

export default Importers;

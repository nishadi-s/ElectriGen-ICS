import '../exports.css';
import React from "react";
import ExportsNavBar from "../components/ExportsNavBar.jsx";

//components
import ImporterForm from '../components/ImporterForm' 

const Importers = () => {
  
  return (
    <div className="importer with-background">
    <ExportsNavBar>
    <div>
      <div>
      <h1>Importers</h1><br></br>
      </div>
      <ImporterForm/>
    </div>
    </ExportsNavBar>
    </div>
  );
  
};

export default Importers;

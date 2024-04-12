import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useImportersContext } from "../hooks/useImportersContext";
import ImporterSearch from '../components/ImporterSearch'; 
import ExportsNavBar from "../components/ExportsNavBar.jsx";
//components
//import ImporterDetails from '../components/ImporterDetails'

const ImporterDescription=()=>{
  const {dispatch:importersDispatch} = useImportersContext()

  useEffect(()=>{
    
    const fetchImporters=async()=>{
      const response=await fetch('/api/importer')
      const json=await response.json()

      if(response.ok){
        importersDispatch({type: 'SET_IMPORTERS',payload:json})
      }

    }

    fetchImporters()
  }, [importersDispatch])


  return (
    <ExportsNavBar>
    <div className="im-dashboard">
      
      <div className="importers">
        <h2>Importers</h2><br />
        <ImporterSearch />
      </div>
    </div>
    </ExportsNavBar>
  );
};

export default ImporterDescription;

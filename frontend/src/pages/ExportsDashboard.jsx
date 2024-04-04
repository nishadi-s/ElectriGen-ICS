import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useExportsContext } from "../hooks/useExportsContext";
import { useImportersContext } from "../hooks/useImportersContext";

//components
import ExportDetails from '../components/ExportDetails'
import ImporterDetails from '../components/ImporterDetails'

const ExportsDashboard=()=>{
  const {exports,dispatch:exportsDispatch} = useExportsContext()
  const {importers,dispatch:importersDispatch} = useImportersContext()

  useEffect(()=>{
    const fetchExports=async()=>{
      const response=await fetch('/api/export')
      const json=await response.json()

      if(response.ok){
        exportsDispatch({type: 'SET_EXPORTS',payload:json})
      }

    }

    
    const fetchImporters=async()=>{
      const response=await fetch('/api/importer')
      const json=await response.json()

      if(response.ok){
        importersDispatch({type: 'SET_IMPORTERS',payload:json})
      }

    }

    fetchExports()
    fetchImporters()
  }, [exportsDispatch, importersDispatch])

    return (
      
      <div className="exdash">
        <div className="exports">
        <h2>Export Orders</h2><br></br>
          {exports && exports.map((exportt)=>(
            <ExportDetails key={exportt._id} exportt={exportt}/>           
          ))}
        <h2>Importers</h2><br></br>
          {importers && importers.map((importer)=>(
            <ImporterDetails key={importer._id} importer={importer}/>           
          ))}
        </div>
      </div>
    );
};
      
export default ExportsDashboard;
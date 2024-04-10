import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useExportsContext } from "../hooks/useExportsContext";
//import { useImportersContext } from "../hooks/useImportersContext";
import ExportSearch from '../components/ExportSearch'; 

//components
//import ExportDetails from '../components/ExportDetails'
//import ImporterDetails from '../components/ImporterDetails'

const ExportsDashboard=()=>{
  const {dispatch:exportsDispatch} = useExportsContext()
  //const {importers,dispatch:importersDispatch} = useImportersContext()

  useEffect(()=>{
    const fetchExports=async()=>{
      const response=await fetch('/api/export')
      const json=await response.json()

      if(response.ok){
        exportsDispatch({type: 'SET_EXPORTS',payload:json})
      }

    }

    
    // const fetchImporters=async()=>{
    //   const response=await fetch('/api/importer')
    //   const json=await response.json()

    //   if(response.ok){
    //     importersDispatch({type: 'SET_IMPORTERS',payload:json})
    //   }

    // }

    fetchExports()
    //fetchImporters()
  }, [exportsDispatch])


  return (
    <div className="ex-dashboard">
      
      <div className="exports">
        <h2>Export Orders</h2><br />
        <ExportSearch />
      </div>
    </div>
  );
};

export default ExportsDashboard;

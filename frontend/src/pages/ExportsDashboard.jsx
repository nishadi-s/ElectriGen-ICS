import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useExportsContext } from "../hooks/useExportsContext";
import ExportSearch from '../components/ExportSearch'; 


const ExportsDashboard=()=>{
  const {dispatch:exportsDispatch} = useExportsContext()

  useEffect(()=>{
    const fetchExports=async()=>{
      const response=await fetch('/api/export')
      const json=await response.json()

      if(response.ok){
        exportsDispatch({type: 'SET_EXPORTS',payload:json})
      }

    }


    fetchExports()
    
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

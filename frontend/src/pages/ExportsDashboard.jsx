import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useExportsContext } from "../hooks/useExportsContext";
import ExportSearch from '../components/ExportSearch'; 
import ExportsNavBar from "../components/ExportsNavBar.jsx";
import { Link } from 'react-router-dom';

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
<div className="ex-dashboard with-background">
    <ExportsNavBar>
      
    <div className="ex-dashboard">      
      <div className="exports">
        <h1>Export Order Details</h1><br />

        <ExportSearch />

      </div>      
    </div>
    
    { <Link to={`/ExportsReport`} className="report-button">
         Generate Report
      </Link> }
    </ExportsNavBar>
    </div>
  );
};

export default ExportsDashboard;

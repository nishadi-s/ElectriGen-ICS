import '../exports.css';
import React from "react";
import { useEffect } from "react";
import { useExportsContext } from "../hooks/useExportsContext";
import ExportsRepo from '../components/ExportsRepo'; 
import ExportsNavBar from "../components/ExportsNavBar.jsx";

const ExportsReport=()=>{
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
        <h1>Exports Report Generation</h1><br />

        <ExportsRepo/>

      </div>      
    </div>

    
    
    </ExportsNavBar>
    </div>
  );
};

export default ExportsReport;

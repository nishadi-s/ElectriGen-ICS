import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {ExportsContextProvider} from './context/ExportContext'
import { ImportersContextProvider } from "./context/ImporterContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ExportsContextProvider>
    <ImportersContextProvider>
      <App />
      </ImportersContextProvider> 
    </ExportsContextProvider> 
    
  </React.StrictMode>
);

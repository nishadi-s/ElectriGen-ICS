import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
 //Nishadi
 import { SupplierOrderContextProvider } from "./context/SupplierOrderContext";
 import { SupplierContextProvider } from "./context/SupplierContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SupplierOrderContextProvider>
      <SupplierContextProvider>
      <App />
      </SupplierContextProvider>
   
    </SupplierOrderContextProvider>
   
  </React.StrictMode>
);

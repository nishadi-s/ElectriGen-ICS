import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
 //Nishadi
 import { SupplierOrderContextProvider } from "./context/SupplierOrderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SupplierOrderContextProvider>
    <App />
    </SupplierOrderContextProvider>
   
  </React.StrictMode>
);

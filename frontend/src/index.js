import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
 //Nishadi
 import { SupplierOrderContextProvider } from "./context/SupplierOrderContext";
 import { SupplierContextProvider } from "./context/SupplierContext";


//Shanali
import {ExportsContextProvider} from './context/ExportContext'
import { ImportersContextProvider } from "./context/ImporterContext";

//Dinithi
import { OrdersContextProvider } from './context/OrderContext';

//Senith
import { ProductsContextProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <SupplierOrderContextProvider>
    <SupplierContextProvider>
    <ExportsContextProvider>
    <ImportersContextProvider>
    <ProductsContextProvider>
    <OrdersContextProvider>    
    <App />
    </OrdersContextProvider>    
  </ProductsContextProvider>
  </ImportersContextProvider> 
  </ExportsContextProvider> 
  </SupplierContextProvider>
  </SupplierOrderContextProvider>
 </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SalaryContextProvider } from "./context/SalaryContext";
//import { AuthContextProvider } from './context/AuthContext';

//Senith
import { ProductsContextProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <AuthContextProvider>*/}
    <SalaryContextProvider>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
    </SalaryContextProvider>
   {/* </AuthContextProvider>*/}
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SalaryContextProvider } from "./context/SalaryContext";

//Senith
import { ProductsContextProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SalaryContextProvider>
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
    </SalaryContextProvider>
  </React.StrictMode>
);

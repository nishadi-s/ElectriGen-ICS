import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { OrdersContextProvider } from './context/OrderContext';

//Senith
import { ProductsContextProvider } from "./context/ProductContext";
import { DisDAuthContextProvider } from './context/DisDAuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DisDAuthContextProvider>
    <OrdersContextProvider>    
    <App/>
    </OrdersContextProvider>    
    </DisDAuthContextProvider>
 </React.StrictMode>
);

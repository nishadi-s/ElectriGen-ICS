import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Uvindya
import { SalaryContextProvider } from "./context/SalaryContext";
//import { AuthContextProvider } from './context/AuthContext';

//Nishadi
import { SupplierOrderContextProvider } from "./context/SupplierOrderContext";
import { SupplierContextProvider } from "./context/SupplierContext";

//Shanali
import { ExportsContextProvider } from "./context/ExportContext";
import { ImportersContextProvider } from "./context/ImporterContext";

//Dinithi
import { OrdersContextProvider } from "./context/OrderContext";
import { DisDAuthContextProvider } from "./context/DisDAuthContext";

//Senith
import { ProductsContextProvider } from "./context/ProductContext";
import { ProductionContextProvider } from "./context/ProductionContext";
import { MaterialsContextProvider } from "./context/MaterialContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SalaryContextProvider>
      <SupplierOrderContextProvider>
        <SupplierContextProvider>
          <ExportsContextProvider>
            <ImportersContextProvider>
              <MaterialsContextProvider>
                <ProductionContextProvider>
                  <ProductsContextProvider>
                    <DisDAuthContextProvider>
                      <OrdersContextProvider>
                        <App />
                      </OrdersContextProvider>
                    </DisDAuthContextProvider>
                  </ProductsContextProvider>
                </ProductionContextProvider>
              </MaterialsContextProvider>
            </ImportersContextProvider>
          </ExportsContextProvider>
        </SupplierContextProvider>
      </SupplierOrderContextProvider>
    </SalaryContextProvider>
  </React.StrictMode>
);

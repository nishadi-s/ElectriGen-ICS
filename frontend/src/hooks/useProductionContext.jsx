import { ProductionContext } from "../context/ProductionContext";
import { useContext } from "react";

export const useProductionContext = () => {
  const context = useContext(ProductionContext);

  if (!context) {
    throw Error(
      "useProductionContext must be used inside a ProductionContextProvider"
    );
  }

  return context;
};

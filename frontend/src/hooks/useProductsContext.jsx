import { ProductsContext } from "../context/ProductContext";
import { useContext } from "react";

export const useProductContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error(
      "useProductContext must be used inside a ProductContextProvider"
    );
  }

  return context;
};

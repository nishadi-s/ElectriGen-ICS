import { MaterialsContext } from "../context/MaterialContext";
import { useContext } from "react";

export const useMaterialContext = () => {
  const context = useContext(MaterialsContext);

  if (!context) {
    throw Error(
      "useMaterialsContext must be used inside a MaterialsContextProvider"
    );
  }

  return context;

};

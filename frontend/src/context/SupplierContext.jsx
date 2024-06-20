import React, { createContext, useReducer } from "react";

export const SupplierContext = createContext();

export const suppliersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUPPLIER':
      return {
        ...state,
        suppliers: action.payload
      };
    case 'CREATE_SUPPLIER':
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers]
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter((e) => e._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const SupplierContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(suppliersReducer, {
    suppliers: [], // Initialize suppliers state as an empty array
    selectedSupplier: null,
    allSuppliers: [] // Initialize allSuppliers state as an empty array
  });

  return (
    <SupplierContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SupplierContext.Provider>
  );
};

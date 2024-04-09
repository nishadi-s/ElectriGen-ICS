import React, { createContext, useReducer } from 'react';

const SalesContext = createContext();

export const salesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SALES':
      return { 
        sales: action.payload 
      };
    case 'CREATE_SALES':
      return { 
        sales: [action.payload, ...(state.sales || [])] 
      };
    case 'DELETE_SALES':
      return {
        sales: (state.sales || []).filter((s) => s.billID !== action.payload.billID)
      };
    default:
      return state;
  }
};

const SalesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(salesReducer, { sales: [] }); // Provide initial state with correct structure

  return (
    <SalesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SalesContext.Provider>
  );
};

export { SalesContext, SalesContextProvider };

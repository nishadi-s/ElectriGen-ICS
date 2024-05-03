import { createContext, useReducer } from "react";

export const ProductionContext = createContext();

export const productionReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTION":
      return {
        production: action.payload,
      };

    case "CREATE_PRODUCTION":
      return {
        production: [action.payload, ...state.production],
      };

    case "DELETE_PRODUCTION":
      return {
        production: state.production.filter(
          (p) => p._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ProductionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productionReducer, {
    production: null,
  });
  return (
    <ProductionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductionContext.Provider>
  );
};

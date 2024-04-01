import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };

    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: null,
  });
  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

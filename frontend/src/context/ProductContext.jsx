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

    case "DELETE_WORKOUT":
      return {
        products: state.products.filter((p) => p._id != action.payload._id),
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

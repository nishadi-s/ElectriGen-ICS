import { createContext, useReducer } from "react";

export const SalaryContext = createContext();

export const salaryReducer = (state, action) => {
  switch (action.type) {
    case "SET_SALARIES":
      return {
        salaries: action.payload,
      };

    case "CREATE_SALARY":
      return {
        salaries: [action.payload, ...state.salaries],
      };

    case "DELETE_SALARY":
      return {
        salaries: state.salaries.filter((s) => s._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const SalaryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(salaryReducer, {
    salaries: null,
  });

  return (
    <SalaryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SalaryContext.Provider>
  );
};

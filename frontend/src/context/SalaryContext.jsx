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
      // Filter out the deleted salary from the state
      return {
        salaries: state.salaries.filter((s) => s._id !== action.payload),
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
import { createContext, useReducer } from 'react'

export const OrdersContext = createContext()

export const ordersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.payload
            };
        case 'CREATE_ORDER':
            return {
                ...state,
                orders: [action.payload, ...state.orders]
            };
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: state.orders.filter((o) => o._id !== action.payload._id)
            };
        case 'UPDATE_ORDER':
            // Find and replace the updated order
            const updatedOrders = state.orders.map(order =>
                order._id === action.payload._id ? action.payload : order
            );
            return {
                ...state,
                orders: updatedOrders
            };
        default:
            return state;
    }
};

export const OrdersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ordersReducer, {
        orders: null
    })

    return(
        <OrdersContext.Provider value = {{...state,dispatch}}>
            { children }
        </OrdersContext.Provider>
    )
}
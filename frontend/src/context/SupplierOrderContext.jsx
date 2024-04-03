import { createContext, useReducer } from "react";

export const SupplierOrderContext=createContext()

export const ordersReducer=(state,action)=>{
    switch (action.type){
        case 'SET_ORDERS':
            return{
                orders:action.payload
            }
        case 'CREATE_ORDER':
            return{
                orders:[action.payload, ...state.orders]
            }
        /*case 'DELETE_ORDER':
            return{
                orders: state.orders.filter((e)=>e._id!==action.payload._id)
            }*/
        default:
            return state
        
    }
}

export const SupplierOrderContextProvider=({children})=>{
    const [state,dispatch]=useReducer(ordersReducer,{
        orders:null
    })

   
    return(
        <SupplierOrderContext.Provider value={{...state,dispatch}}>
            { children }
        </SupplierOrderContext.Provider>
    )
}
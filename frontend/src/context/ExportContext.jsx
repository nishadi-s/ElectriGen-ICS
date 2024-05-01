import { createContext, useReducer } from "react";

export const ExportsContext=createContext()

export const exportsReducer=(state,action)=>{
    switch (action.type){
        case 'SET_EXPORTS':
            return{
                exports:action.payload
            }
        case 'CREATE_EXPORT':
            return{
                exports:[action.payload, ...state.exports]
            }
        case 'DELETE_EXPORT':
            return{
                exports: state.exports.filter((e)=>e._id!==action.payload._id)
            }
        default:
            return state
        
    }
}

export const ExportsContextProvider=({children})=>{
    const [state,dispatch ]=useReducer(exportsReducer,{
        exports:[]
    })

    return(
        <ExportsContext.Provider value={{...state,dispatch}}>
            { children }
        </ExportsContext.Provider>
    )
}
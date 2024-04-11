/*import { createContext, useReducer } from "react";

export const ImportersContext=createContext()

export const importersReducer=(state,action)=>{
    switch (action.type){
        case 'SET_IMPORTERS':
            return{
                importers:action.payload
            }
        case 'CREATE_IMPORTER':
            return{
                importers:[action.payload, ...state.importers]
            }
        // case 'DELETE_EXPORT':
        //     return{
        //         exports: state.exports.filter((e)=>e._id!==action.payload._id)
        //     }
        default:
            return state
        
    }
}

export const ImportersContextProvider=({children})=>{
    const [state,dispatch ]=useReducer(importersReducer,{
        importers:null
    })

    return(
        <ImportersContext.Provider value={{...state,dispatch }}>
            { children }
        </ImportersContext.Provider>
    )
}*/
import { createContext, useReducer } from "react";




export const DisDAuthContext = createContext()

export const disDAuthReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':
        return { distributor: action.payload }

        case 'LOGOUT':
        return { distributor: null }

        default:
            return state
    }
}

export const DisDAuthContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(disDAuthReducer,{
        distributor: null
    })

    console.log('DisDAuthContext state:' , state)

    return(
        <DisDAuthContext.Provider value = {{...state,dispatch}}>
            { children }
        </DisDAuthContext.Provider>
    )
}
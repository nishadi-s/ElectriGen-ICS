import { DisDAuthContext } from "../context/DisDAuthContext"
import { useContext } from "react"

export const useDisDAuthContext = () => {
    const context = useContext(DisDAuthContext)

    if(!context){
        throw Error('useDisDAuthContext must be used inside an DisDAuthContextProvider')
    }
    return context
}
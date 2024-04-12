import {ImportersContext} from '../context/ImporterContext';
import { useContext } from 'react'

export const useImportersContext=()=>{
    const context=useContext(ImportersContext)

    if(!context){
        throw Error('useImportersContext must be used inside an ImportersContextProvider')
    }
    return context
}
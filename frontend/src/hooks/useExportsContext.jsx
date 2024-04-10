import {ExportsContext} from '../context/ExportContext';
import { useContext } from 'react'

export const useExportsContext=()=>{
    const context=useContext(ExportsContext)

    if(!context){
        throw Error('useExportsContext must be used inside an ExportsContextProvider')
    }
    return context
}
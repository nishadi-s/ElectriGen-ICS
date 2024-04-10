import { SupplierOrderContext } from "../context/SupplierOrderContext";
import { useContext } from "react";

export const useSupplierOrderContext = () =>{
const context = useContext (SupplierOrderContext)


if(!context){
    throw Error('useSupplierOrderContext must be used inside an SupplierOrderContextProvider')
}

return context

}
import React from "react";
import '../SupplierOrder.css';
import {useEffect} from 'react'
import { useSupplierOrderContext } from "../hooks/useSupplierOrderContext";


//components
import SupplierOrderDetails from '../components/SupplierOrderDetails'
import SupplierOrderForm from '../components/SupplierOrderForm'



const SupplierOrders = () => {
  const {orders,dispatch} = useSupplierOrderContext ()
    


useEffect (() => {
const fetchSupplier_Order = async () => {
const response =  await fetch ('/api/supplier_order')
const json = await response.json()


if (response.ok){
   dispatch({type:'SET_ORDERS',payload:json}) 
}
}

fetchSupplier_Order()
},[dispatch]) 


  return (
    <div className ="supplier_order">
      <h1> Order</h1>
      { orders && orders.map((order) => (
    
    <SupplierOrderDetails key={orders._Sup_Ord_id} order={order}/>
      )
      )}
     <SupplierOrderForm/> 

     
    </div>
    
  );
};

  


export default SupplierOrders;
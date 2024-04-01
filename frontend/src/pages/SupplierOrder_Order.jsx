import React from "react";
import {useEffect, useState} from 'react'


//components
import SupplierOrderDetails from '../components/SupplierOrderDetails'
import SupplierOrderForm from '../components/SupplierOrderForm'



const Orders = () => {
  
    const [supplier_order, setSupplier_order] = useState(null)


useEffect (() => {
const fetchSupplier_Order = async () => {
const response =  await fetch ('/api/supplier_order')
const json = await response.json()


if (response.ok){
    setSupplier_order(json)
}
}

fetchSupplier_Order()
},[]) 


  return (
    <div claaName ="supplier_order">
      <h1> Order</h1>
      { supplier_order && supplier_order.map((order) => (
    
    <SupplierOrderDetails key = {supplier_order._Sup_Ord_id} order ={order}/>
      )
      )}
       <SupplierOrderForm/> 
    </div>
  );
};

  


export default Orders;
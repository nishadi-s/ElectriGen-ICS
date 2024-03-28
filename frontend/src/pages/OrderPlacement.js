import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext.js'
import OrderForm from '../components/OrderForm.js' //components


const OrderPlace = () => {
    const {orders,dispatch} = useOrdersContext()

    //fetching method implementation
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders')
            const json = await response.json()

            if(response.ok){
               dispatch({type: 'SET_ORDERS', payload: json})
            }
        }

        //method calling
        fetchOrders()  
    }, [dispatch])


    return (
        <div className="OrderPlace">
            <OrderForm/>
            </div>
    )
}
export default OrderPlace
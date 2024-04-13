import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext.js'
import { useDisDAuthContext } from '../hooks/useDisDAuthContext.js'
import OrderForm from '../components/OrderForm.js' //components
import NavbarDini1 from '../components/DisNavbar.jsx'

const OrderPlace = () => {
    const {orders,dispatch} = useOrdersContext()
    const { distributor } = useDisDAuthContext()

    //fetch data
    //fetching data from the backend API
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders', {
                headers: {
                    'Authorization': `Bearer ${distributor.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
               dispatch({type: 'SET_ORDERS', payload: json}) //update the global order context state 
            }
        }

        if(distributor){
            fetchOrders()
        }
    }, [dispatch, distributor])


    return (
        <NavbarDini1>
        <div className="OrderPlace">
            <OrderForm/>
        </div>
        </NavbarDini1>
            
    )
}
export default OrderPlace
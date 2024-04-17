import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext.jsx'
import { useDisDAuthContext } from '../hooks/useDisDAuthContext.jsx'
import OrderForm from '../components/OrderForm.jsx' //components
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
        <div className="OrderPlace" >
        <h1>Order Placement</h1>
            <OrderForm/>
        </div>
        </NavbarDini1>
            
    )
}
export default OrderPlace
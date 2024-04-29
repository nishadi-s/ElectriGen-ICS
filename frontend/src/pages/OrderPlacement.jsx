import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext.jsx'
import OrderForm from '../components/OrderForm.jsx'
import NavbarDini1 from '../components/DisNavbar.jsx'

const OrderPlace = () => {
    const { orders, dispatch } = useOrdersContext()
    const distributor = JSON.parse(localStorage.getItem('distributor'));
    const distributorLoginID = distributor ? distributor.distributorLoginID : '';

    // Fetch data
    // Fetching data from the backend API
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_ORDERS', payload: json }) // Update the global order context state 
            }
        }

        fetchOrders()
    }, [dispatch])

    return (
        <NavbarDini1>
            <div className="OrderPlace">
                <h1>Order Placement</h1>
                <p>Distributor ID: {distributorLoginID}</p>
                <OrderForm />
            </div>
        </NavbarDini1>
    )
}

export default OrderPlace;
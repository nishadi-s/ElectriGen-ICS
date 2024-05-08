import { useEffect } from 'react'
import React, { useState } from 'react';
import { useOrdersContext } from '../hooks/useOrdersContext.jsx'
//components
import NavbarDini2 from '../components/DisMNavbar.jsx'
import DisMOrderDetails from '../components/DisMOrderDetails.jsx'
import SearchBar from '../components/Distributor_Search.jsx'
import '../DistributionFun.css'

const DisMOrderHistory = () => {
  const { orders, dispatch } = useOrdersContext();

    // State for search term and filtered orders
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

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

    // Initialize filteredOrders with all orders when component mounts
    useEffect(() => {
        setFilteredOrders(orders || []); //orders is not null
    }, [orders]);

    // Function to filter orders based on search term
  const handleFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); //case-insensitive search

    const filtered = orders.filter((order) => {
      const searchText = e.target.value.toLowerCase(); // Lowercase search term for matching
      const orderString = JSON.stringify(order).toLowerCase(); // Lowercase order data

      return orderString.includes(searchText);
    });

    setFilteredOrders(filtered);
  };

  // Function to highlight search term within order details (optional)
  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(searchTerm, 'gi'); // Global, case-insensitive search
    return text.replace(regex, (match) => `<mark>${match}</mark>`); // Wrap matched terms in `<mark>` tags
  };
    return (
      <NavbarDini2>
        <div className="home">
        <h1>Order History</h1>
      <SearchBar onChange={handleFilter} style={{ marginBottom: '20px' }} />
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <DisMOrderDetails
              key={order._id}
              order={order}
              highlightSearchTerm={highlightSearchTerm} // Pass highlight function as a prop
            />
          ))
        ) : (
          searchTerm && <p>No orders found matching "{searchTerm}".</p> // Informative message when no results found
        )}
        </div>
    </NavbarDini2>
    )
}
export default DisMOrderHistory
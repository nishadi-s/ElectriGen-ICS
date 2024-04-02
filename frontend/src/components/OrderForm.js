import { useState } from "react"
import { useOrdersContext } from "../hooks/useOrdersContext"

const OrderForm = () => {
    const{ dispatch } = useOrdersContext()

    const[distributorId, setDistributorId] = useState('')
    const[distributorName, setDistributorName] = useState('')
    const [items, setItems] = useState([
        { code: "", name: "", quantity: "" },
        { code: "", name: "", quantity: "" },
        { code: "", name: "", quantity: "" }
    ]);
    const[orderStatus, setOrderStatus] = useState('')

    const[error, setError] = useState('')
    const[emptyFields, setEmptyFields] = useState([])

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

const handleSubmit = async (e) => {
    e.preventDefault()

    const order = {distributorId,
                   distributorName,
                   items,
                   orderStatus}

    const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setDistributorId('')
        setDistributorName('')
        setItems([
            { code: "", name: "", quantity: "" },
            { code: "", name: "", quantity: "" },
            { code: "", name: "", quantity: "" }
        ]);
        setOrderStatus('');

        setError(null)
        setEmptyFields([])
        console.log('new order added', json)
        dispatch({type: 'CREATE_ORDER', payload: json})
    }
}
    
    return(
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Order Placement Form</h3>

            <label>Distributor ID</label>
            <input
                type = "text"
                onChange = {(e) => setDistributorId(e.target.value)}
                value = {distributorId}
                className = {emptyFields.includes('distributorId') ? 'error' : ''}
            />

            <label>Distributor's Name</label>
            <input
                type = "text"
                onChange = {(e) => setDistributorName(e.target.value)}
                value = {distributorName}
                className = {emptyFields.includes('distributorName') ? 'error' : ''}
            />

{items.map((item, index) => (
                <div key={index}>
                    <label>Item({index + 1}) code</label>
                    <input
                        type="text"
                        onChange={(e) => handleItemChange(index, 'code', e.target.value)}
                        value={item.code}
                    />

                    <label>Item({index + 1}) Name</label>
                    <input
                        type="text"
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        value={item.name}
                    />

                    <label>Item({index + 1}) Quantity</label>
                    <input
                        type="number"
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        value={item.quantity}
                    />
                </div>
            ))}

            <label>Order Status</label>
            <input
                type = "text"
                onChange = {(e) => setOrderStatus(e.target.value)}
                value = {orderStatus}
            />

            <button onClick={()=>window.location.href='/OrderSuccess'}>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default OrderForm
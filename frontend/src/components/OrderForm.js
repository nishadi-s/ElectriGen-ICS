import { useState } from "react"
import { useOrdersContext } from "../hooks/useOrdersContext"

const OrderForm = () => {
    const{ dispatch } = useOrdersContext()

    const[distributorId, setDistributorId] = useState('')
    const[distributorName, setDistributorName] = useState('')
    const[item1_code, setItem1_code] = useState('')
    const[item1_name, setItem1_name] = useState('')
    const[item1_quantity, setItem1_quantity] = useState('')
    const[item2_code, setItem2_code] = useState('')
    const[item2_name, setItem2_name] = useState('')
    const[item2_quantity, setItem2_quantity] = useState('')
    const[item3_code, setItem3_code] = useState('')
    const[item3_name, setItem3_name] = useState('')
    const[item3_quantity, setItem3_quantity] = useState('')
    const[orderStatus, setOrderStatus] = useState('')

    const[error, setError] = useState('')
    const[emptyFields, setEmptyFields] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault()

    const order = {distributorId,
                   distributorName,
                  item1_code,
                  item1_name,
                  item1_quantity,
                  item2_code,
                  item2_name,
                  item2_quantity,
                  item3_code,
                  item3_name,
                  item3_quantity,
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
        setItem1_code('')
        setItem1_name('')
        setItem1_quantity('')
        setItem2_code('')
        setItem2_name('')
        setItem2_quantity('')
        setItem3_code('')
        setItem3_name('')
        setItem3_quantity('')
        setOrderStatus('')

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

            <label>Item(1) code</label>
            <input
                type = "text"
                onChange = {(e) => setItem1_code(e.target.value)}
                value = {item1_code}
            />

            <label>Item(1) Name</label>
            <input
                type = "text"
                onChange = {(e) => setItem1_name(e.target.value)}
                value = {item1_name}
            />

            <label>Item(1) Quantity</label>
            <input
                type = "number"
                onChange = {(e) => setItem1_quantity(e.target.value)}
                value = {item1_quantity}
            />

            {item1_code && item1_name && item1_quantity && (
            <>
            <label>Item(2) code</label>
            <input
                type = "text"
                onChange = {(e) => setItem2_code(e.target.value)}
                value = {item2_code}
            />

            <label>Item(2) Name</label>
            <input
                type = "text"
                onChange = {(e) => setItem2_name(e.target.value)}
                value = {item2_name}
            />

            <label>Item(2) Quantity</label>
            <input
                type = "number"
                onChange = {(e) => setItem2_quantity(e.target.value)}
                value = {item2_quantity}
            />
            </>
            )}

            {item2_code && item2_name && item2_quantity && (
            <>
            <label>Item(3) code</label>
            <input
                type = "text"
                onChange = {(e) => setItem3_code(e.target.value)}
                value = {item3_code}
            />

            <label>Item(3) Name</label>
            <input
                type = "text"
                onChange = {(e) => setItem3_name(e.target.value)}
                value = {item3_name}
            />

            <label>Item(3) Quantity</label>
            <input
                type = "number"
                onChange = {(e) => setItem3_quantity(e.target.value)}
                value = {item3_quantity}
            />
                </>
            )}

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
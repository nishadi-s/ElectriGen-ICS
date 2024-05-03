import { useDisDAuthContext } from "./useDisDAuthContext";
import { useOrdersContext } from "./useOrdersContext";

export const useDisLogout = () => {
    const { dispatch } = useDisDAuthContext()
    const { dispatch: ordersDispatch } = useOrdersContext()

    const disLogout = () => {
        //remove your from storage
        localStorage.removeItem('distributor')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        ordersDispatch({type: 'SET_ORDERS', payload: null})
    }

    return {disLogout}
}
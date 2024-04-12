import { useDisDAuthContext } from "./useDisDAuthContext";


export const useDisLogout = () => {
    const { dispatch } = useDisDAuthContext()

    const disLogout = () => {
        //remove your from storage
        localStorage.removeItem('distributor')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return {disLogout}
}
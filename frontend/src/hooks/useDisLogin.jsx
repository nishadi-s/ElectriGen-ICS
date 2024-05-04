import { useContext, useState } from "react";
import { DisDAuthContext } from "../context/DisDAuthContext";

export const useDisLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed null to false
    const { dispatch } = useContext(DisDAuthContext); // Use useContext hook

    const disLogin = async (distributorLoginID, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/distributor/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ distributorLoginID, password })
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error);
            }

            // Save the user to local storage
            localStorage.setItem('distributor', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { disLogin, isLoading, error };
};
import { useState, useEffect } from "react";
import { BASE_URL } from "~/utils";


const useUsers = () => {
    const isLoading = true; // Simulate loading state

}


export const useDebounce = <T>(value: T, delay: number = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}


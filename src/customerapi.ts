import type { Customer } from "./types";

export const fetchCustomer = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
    .then(response => {
        if (!response.ok)
            throw new Error("Error when fetching customers");

        return response.json();
    })
}

export const saveCustomer = (customer: Customer) => {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding a new customer");

        return response.json();
    })
}
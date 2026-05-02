import { useEffect, useState } from "react";
import type { CustomerData } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

function CustomerList() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", width: 120, headerName: "First name" },
        { field: "lastname", width: 120, headerName: "Last name" },
        { field: "email", width: 200, headerName: "Email" },
        { field: "streetaddress", width: 180, headerName: "Street address" },
        { field: "postcode", width: 120, headerName: "Postal code" },
        { field: "city", width: 120, headerName: "City" },
        { field: "phone", width: 150, headerName: "Phone number" }
    ]

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching customer data");
                return response.json();
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <div style={{ width: "95%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={customers}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    );
}

export default CustomerList;
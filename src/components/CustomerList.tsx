import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { saveCustomer } from "../customerapi";

function CustomerList() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", width: 120, headerName: "First name" },
        { field: "lastname", width: 120, headerName: "Last name" },
        { field: "email", width: 200, headerName: "Email" },
        { field: "streetaddress", width: 180, headerName: "Street address" },
        { field: "postcode", width: 120, headerName: "Postal code" },
        { field: "city", width: 120, headerName: "City" },
        { field: "phone", width: 150, headerName: "Phone number" },
        {
            field: "_links.car.href",
            headerName: "",
            sortable: false,
            disableColumnMenu: false,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer customer={params.row} handleUpdate={handleUpdate} />
        }
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

    const handleAdd = (customer: Customer) => {
        saveCustomer(customer)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    }

    const handleUpdate = (url: string, updatedCustomer: Customer) => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when editing a customer");

            return response.json();
        })
        .then(() => getCustomers())
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <div style={{ width: "100%" }}>
                    <div style={{ height: 500 }}>
                        <DataGrid
                            columns={columns}
                            rows={customers}
                            getRowId={row => row._links.self.href}
                            autoPageSize
                            rowSelection={false}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        marginTop: 20,
                        paddingLeft: 20
                    }}>
                        <AddCustomer handleAdd={handleAdd} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerList;
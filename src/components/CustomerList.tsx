import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { saveCustomer } from "../customerapi";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomerList() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", flex: 1, headerName: "First name" },
        { field: "lastname", flex: 1, headerName: "Last name" },
        { field: "email", flex: 1.5, headerName: "Email" },
        { field: "streetaddress", flex: 1.5, headerName: "Street address" },
        { field: "postcode", flex: 1, headerName: "Postal code" },
        { field: "city", flex: 1, headerName: "City" },
        { field: "phone", flex: 1.5, headerName: "Phone number" },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 1.5,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <EditCustomer customer={params.row} handleUpdate={handleUpdate} />
                    <IconButton onClick={() => handleDelete(params.id as string)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ]

    const exportCSV = () => {
        const headers = [
            "First name",
            "Last name",
            "Email",
            "Street address",
            "Postal code",
            "City",
            "Email",
            "Phone"
        ];

        const rows = customers.map(c => [
            c.firstname,
            c.lastname,
            c.email,
            c.streetaddress,
            c.postcode,
            c.city,
            c.email,
            c.phone
        ]);

        const csvContent =
            [headers, ...rows]
                .map(row => row.join(","))
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=uft-8;" });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "customers.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }

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

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a customer");

                    return response.json();
                })
                .then(() => {
                    getCustomers();
                })
                .catch(err => console.error(err))
        }
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
                    <div style={{ height: 527 }}>
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
                        paddingLeft: 20,
                        gap: 10
                    }}>
                        <AddCustomer handleAdd={handleAdd} />
                        <Button sx={{
                            backgroundColor: "#86a9cc",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "#244864"
                            }
                        }} onClick={exportCSV}>
                            Export CSV
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerList;
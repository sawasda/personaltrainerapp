import { useEffect, useState } from "react";
import { type CustomerData, type Training, type TrainingData } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import { saveTraining } from "../trainingapi";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TrainingList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        {
            field: "date",
            flex: 2,
            headerName: "Date",
            renderCell: (params) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm")
        },
        { field: "duration", flex: 1, headerName: "Duration" },
        { field: "activity", flex: 1.5, headerName: "Activity" },
        {
            field: "customer",
            flex: 2,
            headerName: "Customer",
            renderCell: (params) =>
                params.row.customer
                    ? `${params.row.customer.firstname} ${params.row.customer.lastname}`
                    : "No customer"
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ]

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(res => res.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    }

    const getTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching training data");
                return response.json();
            })
            .then(data => setTrainings(data))
            .catch(error => console.error(error));
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure? This action cannot be undone.")) {
            fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting training");
                })
                .then(() => {
                    getTrainings();
                })
                .catch(err => console.error(err))
        }
    }

    const handleAdd = (training: Training) => {
        saveTraining(training)
            .then(() => getTrainings())
            .catch((err: unknown) => console.error(err))
    }

    useEffect(() => {
        getTrainings();
        getCustomers();
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{ width: "70%", height: 527 }}>
                    <DataGrid
                        columns={columns}
                        rows={trainings}
                        getRowId={row => row.id}
                        autoPageSize
                        rowSelection={false}
                    />
                </div>
                <div style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    paddingLeft: 20
                }}>
                    <AddTraining handleAdd={handleAdd} customers={customers} />
                </div>
            </div>
        </>
    );
}

export default TrainingList;
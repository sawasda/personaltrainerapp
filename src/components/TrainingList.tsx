import { useEffect, useState } from "react";
import type { TrainingData } from "../types";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

function TrainingList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    const columns: GridColDef[] = [
        {
            field: "date",
            width: 200,
            headerName: "Date",
            renderCell: (params) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm")
        },
        { field: "duration", width: 100, headerName: "Duration" },
        { field: "activity", width: 200, headerName: "Activity" },
    ]

    const getTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/trainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching data");
                return response.json();
            })
            .then(data => setTrainings(data._embedded.trainings))
            .catch(error => console.error(error));
    }

    useEffect(() => {
        getTrainings();
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={trainings}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    );
}

export default TrainingList;
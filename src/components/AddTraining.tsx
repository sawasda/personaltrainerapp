import { useState } from "react";
import type { Training, CustomerData } from "../types";
import TrainingForm from "./TrainingForm";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type AddTrainingProps = {
    handleAdd: (training: Training) => void;
    customers: CustomerData[];
}

export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Training>({
        date: "",
        duration: "",
        activity: "",
        customer: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleAdd(training);
        handleClose();
    }

    return (
        <>
            <Button onClick={handleClickOpen}
                sx={{
                    backgroundColor: "#305b86",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#244864"
                    }
                }}>
                Add new training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <TrainingForm training={training}
                    setTraining={setTraining}
                    customers={props.customers}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
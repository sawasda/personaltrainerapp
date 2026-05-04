import { useState } from "react";
import type { Customer } from "../types";
import CustomerForm from "./CustomerForm";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type AddCustomerProps = {
    handleAdd: (customer: Customer) => void;
}

export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({
        firstname: "",
        lastname: "",
        email: "",
        streetaddress: "",
        postcode: "",
        city: "",
        phone: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleAdd(customer);
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
                Add a new customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
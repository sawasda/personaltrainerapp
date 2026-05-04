import { useState } from "react";
import type { Customer, CustomerData } from "../types";
import CustomerForm from "./CustomerForm";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";

type EditCustomerProps = {
    customer: CustomerData;
    handleUpdate: (url: string, updatedCustomer: Customer) => void;
}

export default function EditCustomer(props: EditCustomerProps) {
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
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            phone: props.customer.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleUpdate(props.customer._links.self.href, customer);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
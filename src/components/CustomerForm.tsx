import type { Customer } from "../types";
import { DialogContent, TextField } from "@mui/material";

type CustomerFormType = {
    customer: Customer;
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>
}

export default function CustomerForm({ customer, setCustomer }: CustomerFormType) {
    return (
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="First name"
                value={customer.firstname}
                onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Last name"
                value={customer.lastname}
                onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({ ...customer, email: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Street address"
                value={customer.streetaddress}
                onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Postal code"
                value={customer.postcode}
                onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({ ...customer, city: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Phone number"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}
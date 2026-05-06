import type { CustomerData, Training } from "../types";
import { Autocomplete, DialogContent, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

type TrainingFormType = {
    training: Training;
    setTraining: React.Dispatch<React.SetStateAction<Training>>
    customers: CustomerData[];
}

export default function TrainingForm({ training, setTraining, customers }: TrainingFormType) {
    return (
        <DialogContent
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 400
        }}>
            <DateTimePicker
                label="Date"
                value={training.date ? dayjs(training.date) : null}
                onChange={(newValue) => setTraining({
                    ...training,
                    date: newValue ? newValue.toISOString() : ""
                })}
            />
            <TextField
                required
                margin="dense"
                label="Duration"
                value={training.duration}
                onChange={e => setTraining({ ...training, duration: e.target.value})}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={e => setTraining({ ...training, activity: e.target.value })}
                fullWidth
                variant="standard"
            />
            <Autocomplete
                options={customers}
                getOptionLabel={(option) =>
                    `${option.firstname} ${option.lastname}`
                }
                onChange={(e, value) =>
                    setTraining({
                        ...training, customer: value ?
                            value._links.customer.href : ""
                    })}
                renderInput={(params) => (
                    <TextField {...params} label="Customer" required />
                )}
            />
        </DialogContent>
    )
}
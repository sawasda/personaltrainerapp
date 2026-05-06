import { useEffect, useState } from "react";
import CalendarView from "../components/CalendarView";
import type { TrainingData } from "../types";

export default function Calendar() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(res => res.json())
            .then(data => setTrainings(data._embedded?.trainings ?? data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h3>Calendar</h3>
            <CalendarView trainings={trainings} />
        </>
    )
}
import { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { TrainingData } from "../types";
import type { View } from "react-big-calendar";
import '../App.css'

const localizer = dayjsLocalizer(dayjs);

type CalendarViewProps = {
    trainings: TrainingData[];
};

function CalendarView({ trainings }: CalendarViewProps) {

    const [view, setView] = useState<View>("month");
    const [date, setDate] = useState(new Date());

    const events = trainings.map(training => ({
        title: `${training.activity} - ${training.customer?.firstname ?? ""} ${training.customer?.lastname ?? ""}`,
        start: new Date(training.date),
        end: new Date(
            new Date(training.date).getTime() + training.duration * 60000
        )
    }))

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center"
        }}>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day"]}
                    style={{ height: 600, width: 1000 }}
                    defaultView="month"
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                />
            </div>
        </div>
    )
}

export default CalendarView;
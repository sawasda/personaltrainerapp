import type { Training } from "./types";

export const fetchTraining = () => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings")
    .then(response => {
        if (!response.ok)
            throw new Error("Error when fetching trainings");

        return response.json();
    })
}

export const saveTraining = (training: Training) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ...training,
            duration: String(training.duration)
        })
    })
}
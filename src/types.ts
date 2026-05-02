export type TrainingData = {
    date: Date;
    duration: number;
    activity: string;
    _links: {
        self: {
            href: string;
        },
        training: {
            href: string;
        }
    }
}

export type Training = Omit<TrainingData, "_links">;
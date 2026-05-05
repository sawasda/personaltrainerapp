export type TrainingData = {
    id: string;
    date: Date;
    duration: number;
    activity: string;
    customer: {
        firstname: string;
        lastname: string;
    }
}

export type CustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
}

export type Training = {
    date: string;
    duration: number;
    activity: string;
    customer: string;
}

export type Customer = Omit<CustomerData, "_links">;
enum PROJECT_STATE {
    PENDING_STATE = "pending",
    STARTED_STATE = "accepted",
    CANCELED_STATE = "canceled",
    FINISHED_STATE = "finished",
}

type AppResponseType<T> = Promise<{
    data: T
    meta?: any
    links?: any
    message?: any
    errors?: any
    [key: string]: any
}>

export {
    PROJECT_STATE
}

export type {
    AppResponseType,
};

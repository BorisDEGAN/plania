type AppResponseType<T> = Promise<{
    data: T
    meta?: any
    links?: any
    message?: any
    errors?: any
    [key: string]: any
}>

export type {
    AppResponseType,
};

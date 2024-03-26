interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    fullname?: string;
    email?: string;
}

interface IProject {
    id?: number;
    title?: string;
    description?: string;
}

export type { IUser, IProject }
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
    status?: string;
    description?: string;
    context?: string;
    outcomes?: any[];
    steps?: any[];
    steps_planning?: any[];
    budget?: any[];
    budget_planning?: any[];
    budget_notes?: any[];
    activities?: any[];
    user_id?: number;
    user?: IUser;
}

export type { IUser, IProject }
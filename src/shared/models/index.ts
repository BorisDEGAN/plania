interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    fullname?: string;
    email?: string;
}

interface IProject {
    title: string;
    description: string;
    context: string;
    objectives: Objective[];
    outcomes?: string[];
    activities?: string[];
    budget: number;
    budget_plan: BudgetPlan;
    calendar: Calendar;
}

interface Objective {
    title: string;
    outcomes: Outcome[];
}

interface Outcome {
    title: string;
    activities: Activity[];
}

interface Activity {
    title: string;
    start_date: string;
    end_date: string;
}

interface BudgetPlan {
    objectives: Objective[];
}

interface Calendar {
    outcomes: Outcome[];
}


export type { IUser, IProject }
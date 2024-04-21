interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
}

interface IProject {
    id?: string | number
    title: string;
    overview: string;
    context: string;
    justification: string;
    description: string;
    duration: number;
    global_objective: string;

    objectives: string[];

    outcomes: {
        title: string;
        activities: string[];
    }[];

    status?: string;

    logical_context: {
        budget: number;
        budget_currency: string;
        objectives: string[];
        outcomes: {
            title: string;
            impacts: string[];
            intermediate_outcomes: string[];
            immediate_outcomes: string[];
            activities: {
                title: string;
                effects: string[];
            }[];
        }[];
    };

    intervention_strategies: string[];

    partners: {
        name: string;
        abilities: string[];
    }[];

    quality_monitoring: string[];
    performance_matrix: {
        analyse: string;
        effect: string;
        frequency: string;
        collect_tools: string[];
        verification_sources: string[];
    }[];

    budget_plan: {
        section: string;
        activities: {
            title: string;
            budget: number;
        }[];
    }[];

    calendar: {
        outcome: string;
        activities: {
            title: string;
            start_date: string;
            end_date: string;
        }[];
    }[];
}

export type { IUser, IProject }
interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
}

interface IProject {
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

    logical_context: {
        budget: number;
        budget_currency: string;
        objectives: string[];
        outcomes: {
            title: string;
            activities: {
                title: string;
                efects: string[];
                impacts: string[];
                intermediate_outcomes: string[];
                immediate_outcomes: string[];
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
            start_date: Date;
            end_date: Date;
        }[];
    }[];
}

export type { IUser, IProject }
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
    executive_resume?: string;
    context: string;
    justification: string;
    description: string; //description de l'organisation
    duration: number;
    global_objective: string;
    status?: string;
    objectives: string[];
    intervention_strategies: string[];
    quality_monitoring: string[];

    outcomes: {
        title: string;
        activities: string[];
    }[];


    logical_context: {
        impact: string;
        outcomes: {
            title: string;
            intermediate_outcomes: string;
            immediate_outcomes: string;
            activities: {
                title: string;
                effects: string[];
            }[];
        }[];
    };

    performance_matrix: {
        analyse: string;
        effect: string;
        frequency: string;
        collect_tools: string[];
        verification_sources: string[];
    }[];

    partners: {
        name: string;
        abilities: string[];
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

    [key: string]: any
}

interface IProjectPlan extends IProject { }

export type { IUser, IProject, IProjectPlan }
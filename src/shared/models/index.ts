interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
}

interface IStats {
    accepted: number,
    canceled: number,
    finished: number,
    pending: number
}

interface IProject {
    id?: number | string
    title?: string;
    overview?: string;
    context?: string;
    justification?: string;
    description?: string;
    global_objective?: string;

    objectives?: string[];

    duration?: number;
    budget?: string;
    budget_currency?: string;

    logical_context?: {
        impact?: string;
        intermediate_outcomes?: LogicalContextIntermediateOutcome[];
    };

    intervention_strategies?: string[];

    partners?: Partner[];

    quality_monitoring?: string[];

    performance_matrix?: PerformanceMatrixItem[];

    budget_plan?: BudgetPlanItem[];

    calendar?: CalendarItem[];

    created_at?: string;

    [key: string]: any
}

interface LogicalContextIntermediateOutcome {
    title?: string;
    immediate_outcomes?: LogicalContextImmediateOutcome[];
}

interface LogicalContextImmediateOutcome {
    title?: string;
    activities?: LogicalContextActivity[];
}

interface LogicalContextActivity {
    title?: string;
    effect?: string;
}

interface Partner {
    managment_levels?: PartnerManagementLevel[];
}

interface PartnerManagementLevel {
    title?: string;
    level?: string;
    stakeholders?: PartnerStakeholder[];
}

interface PartnerStakeholder {
    name?: string[];
    abilities?: string[];
}

interface PerformanceMatrixItem {
    outcome?: string,
    indicateur?: {
        title?: string;
        props?: {
            baseline?: string[];
            data_souces?: string[];
            target?: string;
            managers?: string[];
            collect_tools?: string[];
            frequency?: string[];
        }
    }[],
}

interface BudgetPlanItem {
    section?: string;
    activities?: BudgetPlanActivity[];
}

interface BudgetPlanActivity {
    title?: string;
    budget?: number;
}

interface CalendarItem {
    outcome?: string;
    activities?: CalendarActivity[];
}

interface CalendarActivity {
    title?: string;
    period?: {
        start_date?: string;
        end_date?: string;
    }[]
}


interface IProjectPlan extends IProject { }

export type { IUser, IProject, IProjectPlan, IStats,LogicalContextIntermediateOutcome, LogicalContextImmediateOutcome, LogicalContextActivity, Partner, PartnerManagementLevel, PartnerStakeholder, PerformanceMatrixItem, BudgetPlanItem, CalendarItem, CalendarActivity }
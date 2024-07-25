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

    scopes?: {
        intervention_zone: string
        male_beneficiary: number
        female_beneficiary: number
        total_beneficiary: number
    }[]

    duration?: number;
    budget?: string;
    budget_currency?: string;

    logical_context?: {
        impact?: string;
        intermediate_outcomes?: LogicalContextIntermediateOutcome[];
    };

    acquisition_plan?: {
        period: Period;
        acquisitions: {
            type: string;
            quantity: number;
            unit_price: number;
            total_price: number;
        }[];
    }[];

    infrastructures_plan?: {
        locality: string;
        type: string;
        period: Period;
        cost: number;
        description: string;
    }[];

    intervention_strategies?: string[];

    partners?: Partner[];

    quality_monitoring?: string[];

    performance_matrix?: PerformanceMatrixItem[];

    budget_plan?: BudgetPlanItem[];

    calendar?: CalendarItem[];

    created_at?: string;
}

interface Period {
    from: string;
    to: string;
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
            target?: string;
            baseline?: string[];
            data_souces?: string[];
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
    unit?: string;
    frequency?: string;
    quantity?: number;
    unit_price?: number;
    amount?: number;
}

interface CalendarItem {
    outcome?: string;
    activities?: CalendarActivity[];
}

interface CalendarActivity {
    title?: string;
    period?: {
        from?: string;
        to?: string;
    }[]
}


interface IProjectPlan extends IProject {
    risk_handles?: {
        steategy?: string;
        risk?: string;
        level?: string;
    }[]
    strategies?: string[]
}

export type { IUser, IProject, IProjectPlan, IStats, LogicalContextIntermediateOutcome, LogicalContextImmediateOutcome, LogicalContextActivity, Partner, PartnerManagementLevel, PartnerStakeholder, PerformanceMatrixItem, BudgetPlanItem, CalendarItem, CalendarActivity, BudgetPlanActivity }
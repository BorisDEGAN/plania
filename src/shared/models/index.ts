interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    fullname: string;
    email: string;
}

interface IProject {
    id?: number | string
    title?: string; // nullable, string, max:255
    overview?: string; // nullable, string
    context?: string; // nullable, string
    justification?: string; // nullable, string
    description?: string; // nullable, string
    global_objective?: string; // nullable, string

    objectives?: string[]; // nullable, array, string[]

    duration?: number; // nullable, integer
    budget?: string; // nullable, string
    budget_currency?: string; // nullable, string

    logical_context?: {
        impact?: string; // nullable, array, string[]
        intermediate_outcomes?: LogicalContextIntermediateOutcome[];
    };

    intervention_strategies?: string[]; // nullable, array, string[]

    partners?: Partner[]; // nullable, array, Partner[]

    quality_monitoring?: string[]; // nullable, array, string[]

    performance_matrix?: PerformanceMatrixItem[]; // nullable, array, PerformanceMatrixItem[]

    budget_plan?: BudgetPlanItem[]; // nullable, array, BudgetPlanItem[]

    calendar?: CalendarItem[]; // nullable, array, CalendarItem[]
}

interface LogicalContextIntermediateOutcome {
    title?: string; // nullable, string
    immediate_outcomes?: LogicalContextImmediateOutcome[]; // nullable, array, LogicalContextImmediateOutcome[]
}

interface LogicalContextImmediateOutcome {
    title?: string; // nullable, string
    activities?: LogicalContextActivity[]; // nullable, array, LogicalContextActivity[]
}

interface LogicalContextActivity {
    title?: string; // nullable, string
    effect?: string; // nullable, string
}

interface Partner {
    managment_levels?: PartnerManagementLevel[]; // nullable, array, PartnerManagementLevel[]
}

interface PartnerManagementLevel {
    title?: string; // nullable, string
    level?: string; // nullable, string
    stakeholders?: PartnerStakeholder[]; // nullable, array, PartnerStakeholder[]
}

interface PartnerStakeholder {
    name?: string[]; // nullable, array, string[]
    abilities?: string[]; // nullable, array, string[]
}

interface PerformanceMatrixItem {
    effect?: string; // nullable, string
    verification_sources?: string[]; // nullable, array, string[]
    collect_tools?: string[]; // nullable, array, string[]
    frequency?: string; // nullable, string
    analyse?: string; // nullable, string
}

interface BudgetPlanItem {
    section?: string; // nullable, string
    activities?: BudgetPlanActivity[]; // nullable, array, BudgetPlanActivity[]
}

interface BudgetPlanActivity {
    title?: string; // nullable, string
    budget?: number; // nullable, numeric
}

interface CalendarItem {
    outcome?: string; // nullable, string
    activities?: CalendarActivity[]; // nullable, array, CalendarActivity[]
}

interface CalendarActivity {
    title?: string; // nullable, string
    start_date?: string; // nullable, date
    end_date?: string; // nullable, date
}


interface IProjectPlan extends IProject { }

export type { IUser, IProject, IProjectPlan }
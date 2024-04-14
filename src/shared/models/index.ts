interface IUser {
    id?: number;
    firstname?: string;
    lastname?: string;
    fullname?: string;
    email?: string;
}

interface IProject {
    title: string;
    description?: string;
    context?: string;
    justification?: string;
    duration?: number;

    global_objective?: string;

    objectives: string[];

    outcomes: Outcome[];

    activities: string[];

    logical_context: LogicalContext;

    intervention_strategy?: string;

    partners: Partner[];

    quality_monitoring?: string[];

    performance_matrix?: PerformanceMatrix[];

    budget_plan?: BudgetPlan[];

    budget_currency?: string;

    calendar?: Calendar[];
}

interface Outcome {
    title: string;
    activities: string[];
}

interface Activity {
    title: string;
    intermediate_outcomes?: string[];
    efects?: string[];
    impacts?: string[];
}

interface LogicalContext {
    budget: number;
    objectives?: string[];
    outcomes: LogicalOutcome[];
}

interface LogicalOutcome {
    title: string;
    activities: LogicalActivity[];
}

interface LogicalActivity {
    title: string;
    intermediate_outcomes: string[];
    efects: string[];
    impacts: string[];
}

interface Partner {
    name: string;
    abilities: string[];
}

interface PerformanceMatrix {
    effect: string;
    verification_sources?: string[];
    collect_tools: string[];
    frequency: string;
    analyse: string;
}

interface BudgetPlan {
    section: string;
    activities: BudgetActivity[];
}

interface BudgetActivity {
    title: string;
    budget: number;
}

interface Calendar {
    outcome: string;
    activities: CalendarActivity[];
}

interface CalendarActivity {
    title: string;
    start_date: string;
    end_date: string;
}



export type { IUser, IProject }
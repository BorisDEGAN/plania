import { IProject } from "@/shared/models";

export const ProjectData: IProject = {
    title: "My Project",
    overview: "This is a brief overview of my project.",
    context: "The context of my project is...",
    justification: "The justification for my project is...",
    description: "A detailed description of my project.",
    global_objective: "The overall goal of my project.",

    objectives: ["Objective 1", "Objective 2", "Objective 3"],

    duration: 12,
    budget: "100000",
    budget_currency: "USD",

    logical_context: {
        impact: "Impact 1",
        intermediate_outcomes: [
            {
                title: "Intermediate Outcome 1",
                immediate_outcomes: [
                    {
                        title: "Immediate Outcome 1.1",
                        activities: [
                            {
                                title: "Activity 1.1.1",
                                effect: "Effect 1.1.1",
                            },
                            {
                                title: "Activity 1.1.2",
                                effect: "Effect 1.1.2",
                            },
                        ],
                    },
                    {
                        title: "Immediate Outcome 1.2",
                        activities: [
                            {
                                title: "Activity 1.2.1",
                                effect: "Effect 1.2.1",
                            },
                            {
                                title: "Activity 1.2.2",
                                effect: "Effect 1.2.2",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Intermediate Outcome 2",
                immediate_outcomes: [
                    // ... Define immediate outcomes for Intermediate Outcome 2
                ],
            },
        ],
    },

    intervention_strategies: ["Strategy 1", "Strategy 2"],

    partners: [
        {
            managment_levels: [
                {
                    title: "Management Level 1",
                    level: "High",
                    stakeholders: [
                        {
                            name: ["Stakeholder 1.1", "Stakeholder 1.2"],
                            abilities: ["Ability 1.1", "Ability 1.2"],
                        },
                    ],
                },
            ],
        },
    ],

    quality_monitoring: ["Method 1", "Method 2"],

    performance_matrix: [
        {
            outcome: "",
            indicateur: [
                {
                    title: "",
                    props: {
                        target: "",
                        baseline: [],
                        data_souces: [],
                        managers: ["Source 1.1", "Source 1.2"],
                        collect_tools: ["Tool 1.1", "Tool 1.2"],
                        frequency: ["Monthly"],
                    }
                }
            ]
        },
        {
            outcome: "",
            indicateur: [
                {
                    title: "",
                    props: {
                        baseline: [],
                        target: "",
                        data_souces: [],
                        collect_tools: ["Tool 1.1", "Tool 1.2"],
                        frequency: ["Monthly"],
                        managers: ["Source 1.1", "Source 1.2"],
                    }
                }
            ]
        }
    ],

    budget_plan: [
        {
            section: "Section 1",
            activities: [
                {
                    title: "Activity 1.1",
                    budget: 1000,
                },
                {
                    title: "Activity 1.2",
                    budget: 2000,
                },
            ],
        },
    ],

    calendar: [
        {
            outcome: "Outcome 1",
            activities: [
                {
                    title: "Activity 1.1",
                    period: [
                        {
                            start_date: "2024-05-01",
                            end_date: "2024-05-31",
                        }
                    ]
                },
                {
                    title: "Activity 1.1",
                    period: [
                        {
                            start_date: "2024-05-01",
                            end_date: "2024-05-31",
                        }
                    ]
                },
            ],
        },
    ],
};

export const EmptyProjectData: IProject = {
    title: '',
    overview: '',
    context: '',
    justification: '',
    description: '',
    global_objective: '',

    objectives: [],

    duration: 0,
    budget: '',
    budget_currency: '',

    logical_context: {
        impact: '',
        intermediate_outcomes: [],
    },

    intervention_strategies: [],

    partners: [{
        managment_levels: [{
            title: "",
            level: "",
            stakeholders: [
                {
                    name: [],
                    abilities: [],
                }
            ]
        }]
    }],

    quality_monitoring: [],

    performance_matrix: [],

    budget_plan: [],

    calendar: [],
};